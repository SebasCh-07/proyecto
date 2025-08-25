import { useParams, useNavigate } from "react-router-dom";
import { getRequerimientoCompleto } from "../data.js";
import { useState } from "react";

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
  const [videoUrl, setVideoUrl] = useState(null);

  if (!req) return <div>No se encontró el requerimiento</div>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)} className="btn secondary">
        ← Volver
      </button>

      <h2>📋 Requerimiento #{req.id}</h2>
      <p><strong>Cliente:</strong> {req.cliente?.nombre}</p>
      <p><strong>Estado:</strong> {req.estado}</p>
      <p><strong>Dirección:</strong> {req.direccion}</p>
      <p><strong>Plazo:</strong> {req.plazoDias} días</p>

      {/* Mapa */}
      {req.gps && !req.gps.error && (
        <iframe
          title="Mapa ubicación"
          width="100%"
          height="200"
          style={{ border: 0, marginTop: "10px" }}
          loading="lazy"
          src={`https://www.google.com/maps?q=${req.gps.lat},${req.gps.lng}&z=15&output=embed`}
        />
      )}

      {/* Fotos */}
      {req.fotos?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <strong>Fotos:</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {req.fotos.map((f, i) => (
              <img
                key={i}
                src={URL.createObjectURL(f)}
                alt="foto"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Video */}
      {videoUrl && (
        <div style={{ marginTop: 12 }}>
          <strong>Video:</strong>
          <video key={videoUrl} controls width="100%" src={videoUrl} />
        </div>
      )}
    </div>
  );
}
