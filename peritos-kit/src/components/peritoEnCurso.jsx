import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { sampleRequerimientos, getCliente } from "../data.js"

// Formato de tiempo
function fmt(t) {
  const n = Math.max(0, Math.floor(t / 1000))
  const h = String(Math.floor(n / 3600)).padStart(2, "0")
  const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0")
  const s = String(n % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

export default function PeritoEnCurso() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [requerimiento, setRequerimiento] = useState(null)
  const [arrivedAt, setArrivedAt] = useState(null)
  const [gps, setGps] = useState(null)
  const [timerStart, setTimerStart] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [photoFiles, setPhotoFiles] = useState([])
  const [reportFile, setReportFile] = useState(null)
  const [timerStopped, setTimerStopped] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [observaciones, setObservaciones] = useState("")
  const [observacionesTemporales, setObservacionesTemporales] = useState([])

  // Cargar requerimiento
  useEffect(() => {
    const req = sampleRequerimientos.find(r => r.id == id)
    if (req) {
      setRequerimiento(req)
      // Si ya tiene datos guardados, cargarlos
      if (req.arrivedAt) setArrivedAt(new Date(req.arrivedAt))
      if (req.gps) setGps(req.gps)
      if (req.observaciones) setObservaciones(req.observaciones)
    } else {
      navigate("/")
    }
  }, [id, navigate])

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

  const agregarObservacion = () => {
    if (observaciones.trim()) {
      const nuevaObservacion = {
        id: Date.now(),
        texto: observaciones.trim(),
        timestamp: new Date().toLocaleString(),
        tipo: "perito"
      }
      setObservacionesTemporales([...observacionesTemporales, nuevaObservacion])
      setObservaciones("")
    }
  }

  const eliminarObservacion = (id) => {
    setObservacionesTemporales(observacionesTemporales.filter(obs => obs.id !== id))
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

    // Actualizar el requerimiento en sampleRequerimientos
    const index = sampleRequerimientos.findIndex(req => req.id == id)
    if (index !== -1) {
      sampleRequerimientos[index] = {
        ...sampleRequerimientos[index],
        estado: "Finalizado",
        arrivedAt: arrivedAt,
        gps: gps,
        fotos: photoFiles,
        video: videoFile,
        pdf: reportFile,
        observaciones: observacionesTemporales.length > 0 ? observacionesTemporales : observaciones,
        fechaFinalizacion: new Date()
      }
    }

    alert(`✅ Requerimiento #${id} finalizado con éxito.`)
    navigate("/")
  }

  if (!requerimiento) {
    return <div className="container">Cargando...</div>
  }

  return (
    <div className="container" style={{ fontSize: "18px" }}>
      {/* Header con botón de volver */}
      <div className="header" style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}>
        <button 
          className="btn secondary" 
          onClick={() => navigate("/")}
          style={{ marginRight: "16px", fontSize: "16px" }}
        >
          ← Volver
        </button>
        <h2 style={{ margin: 0, color: "#005eff" }}>
          Requerimiento #{requerimiento.id} — {getCliente(requerimiento.clienteId).nombre}
        </h2>
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {/* DATOS BÁSICOS */}
        <div className="panel">
          <h3 style={{ margin: "0 0 16px 0", color: "#005eff", fontSize: "20px" }}>
            Información del Requerimiento
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <strong>Cliente:</strong> {getCliente(requerimiento.clienteId).nombre}
            </div>
            <div>
              <strong>Estado:</strong> 
              <span className="badge info" style={{ marginLeft: "8px" }}>{requerimiento.estado}</span>
            </div>
            <div>
              <strong>Plazo:</strong> {requerimiento.plazoDias} días
            </div>
            <div>
              <strong>Dirección:</strong> {requerimiento.direccion}
            </div>
          </div>
        </div>

        {/* OBSERVACIONES */}
        <div className="panel">
          <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
            Observaciones del Trabajo
          </h3>
          
          {/* Agregar nueva observación */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input
              type="text"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Agregar observación sobre el trabajo..."
              className="input"
              style={{ flex: 1, fontSize: "16px" }}
              onKeyPress={(e) => e.key === 'Enter' && agregarObservacion()}
            />
            <button 
              className="btn primary" 
              onClick={agregarObservacion}
              disabled={!observaciones.trim()}
              style={{ fontSize: "16px" }}
            >
              Agregar
            </button>
          </div>

          {/* Lista de observaciones */}
          {observacionesTemporales.length > 0 && (
            <div style={{ display: "grid", gap: "8px" }}>
              {observacionesTemporales.map((obs) => (
                <div 
                  key={obs.id} 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    padding: "12px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "4px" }}>{obs.texto}</div>
                    <div className="small" style={{ color: "#6c757d" }}>{obs.timestamp}</div>
                  </div>
                  <button 
                    className="btn danger" 
                    onClick={() => eliminarObservacion(obs.id)}
                    style={{ fontSize: "14px", padding: "6px 10px" }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Flujo EN CURSO */}
        <>
          {/* Llegada */}
          <div className="panel">
            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
              Llegada al Sitio
            </h3>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div className="small" style={{ fontSize: "16px" }}>
                {arrivedAt
                  ? `Marcado: ${arrivedAt.toLocaleString()}`
                  : "Sin marcar"}
              </div>
              {!arrivedAt ? (
                <button className="btn" onClick={handleLlegada} style={{ fontSize: "16px" }}>
                  Marcar llegada + GPS
                </button>
              ) : (
                <button
                  className="btn secondary"
                  onClick={openMap}
                  disabled={!gps || gps.error}
                  style={{ fontSize: "16px" }}
                >
                  Ver mapa
                </button>
              )}
            </div>
          </div>

          {/* Timer */}
          <div className="panel">
            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
              Tiempo en Sitio
            </h3>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div className="badge info" style={{ fontSize: "18px", padding: "8px 16px" }}>
                {timerStart
                  ? `⏱ ${fmt(elapsed)}`
                  : timerStopped
                    ? "Detenido"
                    : "No iniciado"}
              </div>
              <div className="row" style={{ gap: "8px" }}>
                <button
                  className="btn"
                  onClick={() => setTimerStart(Date.now())}
                  disabled={!!timerStart}
                  style={{ fontSize: "16px" }}
                >
                  Iniciar
                </button>
                <button
                  className="btn secondary"
                  onClick={handleStopTimer}
                  disabled={!timerStart}
                  style={{ fontSize: "16px" }}
                >
                  Detener
                </button>
              </div>
            </div>
          </div>

          {/* Evidencias */}
          <div className="panel">
            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
              Subir Evidencias
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <div className="label" style={{ fontSize: "16px", marginBottom: "8px" }}>
                  Fotos (múltiples)
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ fontSize: "16px" }}
                  onChange={(e) =>
                    setPhotoFiles(Array.from(e.target.files || []))
                  }
                />
                {photoFiles.length > 0 && (
                  <div className="small" style={{ marginTop: "8px", color: "#6c757d" }}>
                    {photoFiles.length} foto(s) seleccionada(s)
                  </div>
                )}
              </div>
              <div>
                <div className="label" style={{ fontSize: "16px", marginBottom: "8px" }}>
                  Video (máximo 40s)
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={onVideoChange}
                  style={{ fontSize: "16px" }}
                />
                {videoFile && (
                  <div className="small" style={{ marginTop: "8px", color: "#6c757d" }}>
                    Video seleccionado
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informe */}
          <div className="panel">
            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px" }}>
              Informe Final
            </h3>
            <div style={{ marginTop: "8px" }}>
              <input
                type="file"
                style={{ fontSize: "16px" }}
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setReportFile(e.target.files?.[0] || null)
                }
              />
              {reportFile && (
                <div className="small" style={{ marginTop: "8px", color: "#6c757d" }}>
                  Informe seleccionado: {reportFile.name}
                </div>
              )}
            </div>
          </div>

          {/* Botón de finalizar */}
          <div className="panel" style={{ textAlign: "center" }}>
            <button 
              className="btn success" 
              onClick={handleFinalize} 
              style={{ fontSize: "18px", padding: "16px 32px" }}
              disabled={!canFinalize}
            >
              Finalizar Requerimiento
            </button>
            {!canFinalize && (
              <div className="small" style={{ marginTop: "12px", color: "#6c757d" }}>
                Completa todos los campos obligatorios para finalizar
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  )
}
