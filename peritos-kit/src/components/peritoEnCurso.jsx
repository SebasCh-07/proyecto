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

  // Cargar requerimiento
  useEffect(() => {
    const req = sampleRequerimientos.find(r => r.id == id)
    if (req) {
      setRequerimiento(req)
      // Si ya tiene datos guardados, cargarlos
      if (req.arrivedAt) setArrivedAt(new Date(req.arrivedAt))
      if (req.gps) setGps(req.gps)
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
    <div className="container">
      {/* Header con botón de volver */}
      <div className="header" style={{ marginBottom: "20px" }}>
        <button 
          className="btn secondary" 
          onClick={() => navigate("/")}
          style={{ marginRight: "16px" }}
        >
          ← Volver
        </button>
        <h2>Requerimiento #{requerimiento.id} — {getCliente(requerimiento.clienteId).nombre}</h2>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {/* DATOS BÁSICOS */}
        <div className="panel">
          <strong>Cliente:</strong> {getCliente(requerimiento.clienteId).nombre} <br />
          <strong>Estado:</strong> {requerimiento.estado} <br />
          <strong>Plazo global:</strong> {requerimiento.plazoDias} días <br />
          <strong>Dirección:</strong> {requerimiento.direccion}
        </div>

        {/* Flujo EN CURSO */}
        <>
          {/* Llegada */}
          <div className="panel">
            <strong>Llegada al sitio</strong>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="small">
                {arrivedAt
                  ? `Marcado: ${arrivedAt.toLocaleString()}`
                  : "Sin marcar"}
              </div>
              {!arrivedAt ? (
                <button className="btn" onClick={handleLlegada}>
                  Marcar llegada + Capturar GPS
                </button>
              ) : (
                <button
                  className="btn secondary"
                  onClick={openMap}
                  disabled={!gps || gps.error}
                >
                  Ver mapa
                </button>
              )}
            </div>
          </div>

          {/* Timer */}
          <div className="panel">
            <strong>Tiempo en sitio</strong>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="badge info">
                {timerStart
                  ? `⏱ ${fmt(elapsed)}`
                  : timerStopped
                    ? "⏹ Detenido"
                    : "No iniciado"}
              </div>
              <div className="row">
                <button
                  className="btn"
                  onClick={() => setTimerStart(Date.now())}
                  disabled={!!timerStart}
                >
                  Iniciar
                </button>
                <button
                  className="btn secondary"
                  onClick={handleStopTimer}
                  disabled={!timerStart}
                >
                  Detener
                </button>
              </div>
            </div>
          </div>

          {/* Evidencias */}
          <div className="panel">
            <strong>Subir evidencias</strong>
            <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
              <div>
                <div className="label">Fotos</div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setPhotoFiles(Array.from(e.target.files || []))
                  }
                />
              </div>
              <div>
                <div className="label">Video (máx. 40s)</div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={onVideoChange}
                />
              </div>
            </div>
          </div>

          {/* Informe */}
          <div className="panel">
            <strong>Informe final</strong>
            <div className="row" style={{ marginTop: 8 }}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setReportFile(e.target.files?.[0] || null)
                }
              />
            </div>
          </div>

          <div className="panel" style={{ textAlign: "center" }}>
            <button className="btn success" onClick={handleFinalize}>
              ✅ Finalizar Requerimiento
            </button>
          </div>
        </>
      </div>
    </div>
  )
}
