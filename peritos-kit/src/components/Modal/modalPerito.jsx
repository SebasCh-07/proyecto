import { useState, useEffect } from "react"
import Modal from "../Modal"
import {getCliente} from "../../data"

// Formato de tiempo
function fmt(t) {
  const n = Math.max(0, Math.floor(t / 1000))
  const h = String(Math.floor(n / 3600)).padStart(2, "0")
  const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0")
  const s = String(n % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

export default function ModalPerito({ selected, onClose, onDecision }) {
  const [arrivedAt, setArrivedAt] = useState(null)
  const [gps, setGps] = useState(null)
  const [timerStart, setTimerStart] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [photoFiles, setPhotoFiles] = useState([])
  const [reportFile, setReportFile] = useState(null)
  const [timerStopped, setTimerStopped] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  // Genera y limpia la URL cuando cambia el archivo de video
  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoUrl(url)
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      setVideoUrl(null)
    }
  }, [videoFile])

  const onVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setVideoFile(null)
      return
    }
    const url = URL.createObjectURL(file)
    const v = document.createElement("video")
    v.preload = "metadata"
    v.onloadedmetadata = () => {
      window.URL.revokeObjectURL(url)
      if (v.duration > 40) {
        alert("El video supera 40 segundos. Selecciona otro.")
        e.target.value = ""
        setVideoFile(null)
      } else {
        setVideoFile(file)
      }
    }
    v.src = url
  }

  const elapsed = timerStart ? now - timerStart : 0
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const handleLlegada = () => {
    setArrivedAt(new Date())
    setTimerStart(Date.now())
    setTimerStopped(false)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGps({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            acc: pos.coords.accuracy,
          })
        },
        () => {
          setGps({ error: "No se pudo obtener ubicación (permiso denegado)" })
        }
      )
    } else {
      setGps({ error: "Geolocalización no soportada" })
    }
  }

  const handleStopTimer = () => {
    setTimerStart(null)
    setTimerStopped(true)
  }

  const openMap = () => {
    if (!gps) return
    const q = gps.lat && gps.lng ? `${gps.lat},${gps.lng}` : ""
    window.open(`https://maps.google.com/?q=${q}`, "_blank")
  }

  const canFinalize =
    arrivedAt &&
    gps &&
    !gps.error &&
    timerStopped &&
    photoFiles.length > 0 &&
    videoFile &&
    reportFile

  const handleFinalize = () => {
    if (!canFinalize) {
      alert("Debes completar todos los campos antes de finalizar.")
      return
    }
    alert(`✅ Requerimiento #${selected.id} finalizado con éxito.`)
    onDecision(selected.id, "finalizado", {
      arrivedAt,
      gps,
      photoFiles,
      videoFile,
      reportFile,
    })
    onClose()
  }

  // Calcular fecha límite
  const getFechaDeadline = () => {
    if (!selected) return null
    const asignacion = new Date(selected.fechaAsignacion).getTime()
    const deadline = asignacion + selected.plazoDias * 24 * 3600 * 1000
    return new Date(deadline)
  }

  const fechaDeadline = getFechaDeadline()

  return (
    <Modal
      open={!!selected}
      onClose={onClose}
      title={
        selected 
          ? `Requerimiento ${selected.id} — ${getCliente(selected.clienteId).nombre}`
          : ""
      }
    >
      {selected && (
        <div style={{ display: "grid", gap: 12 }}>
          {/* INFORMACIÓN BÁSICA COMPRIMIDA */}
          <div className="panel" style={{ fontSize: "16px", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef", padding: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div><strong>Cliente:</strong> {getCliente(selected.clienteId).nombre}</div>
              <div><strong>Plazo:</strong> {selected.plazoDias} días</div>
              <div><strong>Tel:</strong> {getCliente(selected.clienteId).telefono}</div>
            </div>
          </div>

          {/* ARCHIVO DE ASIGNACIÓN COMPRIMIDO */}
          {selected.archivoAsignacion && (
            <div className="panel" style={{ backgroundColor: "#fff3cd", border: "1px solid #ffeaa7", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <strong style={{ fontSize: "16px" }}>Documento de Asignación</strong>
                <a 
                  href={selected.archivoAsignacion} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: '#007bff',
                    border: '1px solid #0056b3',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  {typeof selected.archivoAsignacion === 'string' && selected.archivoAsignacion.includes('.pdf') ? 'Ver PDF' : 'Ver Excel'}
                </a>
              </div>
              <div className="small" style={{ color: '#856404', fontSize: "14px" }}>
                {selected.archivoAsignacion} - Revisa antes de aceptar
              </div>
            </div>
          )}

          {/* FECHAS COMPRIMIDAS */}
          <div className="panel" style={{ backgroundColor: "#d1ecf1", border: "1px solid #bee5eb", padding: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <strong>Asignación:</strong> {new Date(selected.fechaAsignacion).toLocaleDateString('es-ES', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </div>
              <div>
                <strong>Límite:</strong> 
                <span style={{ color: fechaDeadline && fechaDeadline < new Date() ? '#dc3545' : '#28a745' }}>
                  {fechaDeadline ? fechaDeadline.toLocaleDateString('es-ES', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  }) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Decisión inicial */}
          {selected.estado === "Asignado" && (
            <div className="panel" style={{ fontSize: "18px", backgroundColor: "#d4edda", border: "1px solid #c3e6cb", textAlign: "center", padding: "16px" }}>
              <strong style={{ display: "block", marginBottom: "12px", color: "#155724" }}>
                ¿Aceptar este requerimiento?
              </strong>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <button
                  className="btn success"
                  onClick={() => onDecision(selected.id, "aceptar")}
                  style={{ fontSize: "16px", padding: "10px 20px" }}
                >
                  Aceptar
                </button>
                <button
                  className="btn danger"
                  onClick={() => onDecision(selected.id, "rechazar")}
                  style={{ fontSize: "16px", padding: "10px 20px" }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          )}

          {/* Flujo EN CURSO */}
          {selected.estado === "En curso" && (
            <>
              {/* Llegada */}
              <div className="panel" style={{ padding: "16px" }}>
                <strong>Llegada al sitio</strong>
                <div className="row" style={{ justifyContent: "space-between", marginTop: "8px" }}>
                  <div className="small">
                    {arrivedAt ? `Marcado: ${arrivedAt.toLocaleString()}` : "Sin marcar"}
                  </div>
                  {!arrivedAt ? (
                    <button className="btn" onClick={handleLlegada}>
                      Marcar llegada + GPS
                    </button>
                  ) : (
                    <button className="btn secondary" onClick={openMap} disabled={!gps || gps.error}>
                      Ver mapa
                    </button>
                  )}
                </div>
              </div>

              {/* Timer */}
              <div className="panel" style={{ padding: "16px" }}>
                <strong>Tiempo en sitio</strong>
                <div className="row" style={{ justifyContent: "space-between", marginTop: "8px" }}>
                  <div className="badge info">
                    {timerStart ? `${fmt(elapsed)}` : timerStopped ? "Detenido" : "No iniciado"}
                  </div>
                  <div className="row">
                    <button className="btn" onClick={() => setTimerStart(Date.now())} disabled={!!timerStart}>
                      Iniciar
                    </button>
                    <button className="btn secondary" onClick={handleStopTimer} disabled={!timerStart}>
                      Detener
                    </button>
                  </div>
                </div>
              </div>

              {/* Evidencias */}
              <div className="panel" style={{ padding: "16px" }}>
                <strong>Subir evidencias</strong>
                <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
                  <div>
                    <div className="label">Fotos</div>
                    <input type="file" accept="image/*" multiple onChange={(e) => setPhotoFiles(Array.from(e.target.files || []))} />
                  </div>
                  <div>
                    <div className="label">Video (máx. 40s)</div>
                    <input type="file" accept="video/*" onChange={onVideoChange} />
                  </div>
                </div>
              </div>

              {/* Informe */}
              <div className="panel" style={{ padding: "16px" }}>
                <strong>Informe final</strong>
                <div style={{ marginTop: "8px" }}>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setReportFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              <div className="panel" style={{ textAlign: "center", padding: "16px" }}>
                <button className="btn success" onClick={handleFinalize}>
                  ✅ Finalizar Requerimiento
                </button>
              </div>
            </>
          )}

          {/* Vista si ya está finalizado */}
          {selected.estado === "Finalizado" && (
            <div className="panel" style={{ padding: "16px" }}>
              <h3>📋 Este requerimiento ya fue finalizado</h3>
              <p>Puedes consultarlo en la pantalla de detalle.</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
