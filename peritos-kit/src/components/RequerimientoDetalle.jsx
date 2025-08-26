import { useParams, useNavigate } from "react-router-dom";
import { getRequerimientoCompleto } from "../data.js";

function fmt(t) {
  const n = Math.max(0, Math.floor(t / 1000))
  const h = String(Math.floor(n / 3600)).padStart(2, "0")
  const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0")
  const s = String(n % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

export default function RequerimientoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const req = getRequerimientoCompleto(parseInt(id));

  if (!req) return <div>No se encontró el requerimiento</div>;

  return (
    <div className="card" style={{ padding: 24, maxWidth: 900, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => navigate(-1)} className="btn secondary" style={{ marginRight: 12, fontSize: "17px" }}>
          ← Volver
        </button>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>📋 Requerimiento #{req.id}</h2>
        <span className={`badge ${req.estado === 'Finalizado' ? 'ok' : 'info'}`} style={{ marginLeft: 12 }}>
          {req.estado}
        </span>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Información del Cliente</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Cliente:</strong> {req.cliente?.nombre}</p>
          <p><strong>Teléfono:</strong> {req.cliente?.telefono}</p>
          <p><strong>Contacto:</strong> {req.cliente?.contacto}</p>
          <p><strong>Correo:</strong> {req.cliente?.correo || 'N/A'}</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Detalles del Requerimiento</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Dirección:</strong> {req.direccion}</p>
          <p><strong>Plazo:</strong> {req.plazoDias} días</p>
          <p><strong>Fecha de Asignación:</strong> {new Date(req.fechaAsignacion).toLocaleString()}</p>
          <p><strong>Tiempo en Sitio:</strong> {req.postVisitHours} horas</p>
          <p><strong>Observaciones:</strong> {req.observaciones || 'N/A'}</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 12, color: "#005eff" }}>Evidencias</h3>

        {/* Mapa de Ubicación */}
        <div style={{ marginBottom: 16 }}>
          <strong>📍 Mapa de Ubicación:</strong>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {req.gps && !req.gps.error ? (
              <iframe
                title="Mapa ubicación"
                width="90%"
                height="300"
                style={{ border: 0, marginTop: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                loading="lazy"
                src={`https://www.google.com/maps?q=${req.gps.lat},${req.gps.lng}&z=15&output=embed`}
              />
            ) : (
              <p style={{ color: "#64748b", marginTop: 8 }}>No se pudo cargar el mapa.</p>
            )}
          </div>
        </div>

        {/* Fotos */}
        {req.fotos?.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{marginBottom: "10px" ,display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
            <strong>📸 Fotos:</strong>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              {req.fotos.map((f, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(f)}
                  alt={`Foto ${i + 1}`}
                  style={{
                    width: 500,
                    height: 300,
                    marginTop: "20px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer"
                  }}
                  onClick={() => window.open(URL.createObjectURL(f), '_blank')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {req.video && (
          <div style={{ marginBottom: 16 }}>
            <div style={{marginBottom: "10px" ,display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
            <strong>🎥 Video:</strong>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <video
                key={URL.createObjectURL(req.video)}
                controls
                width="90%"
                src={URL.createObjectURL(req.video)}
                style={{
                  borderRadius: "12px",
                  marginTop: 20,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
            </div>
          </div>
        )}

        {/* Documentos */}
        {req.pdf && (
          <div style={{ marginBottom: 16 }}>
            <div style={{marginBottom: "10px" ,display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>_____________________________________________________________________</div>
            <strong>📄 Informe:</strong>
            <div style={{ marginTop: 8 }}>
              <a
                href={URL.createObjectURL(req.pdf)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#005eff",
                  textDecoration: "none",
                  padding: "8px 16px",
                  backgroundColor: "#eaf1ff",
                  borderRadius: "8px",
                  display: "inline-block"
                }}
              >
                📋 Ver Informe PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
