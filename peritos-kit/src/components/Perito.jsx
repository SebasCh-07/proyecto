import { useState, useEffect } from "react";
import ModalPerito from "./Modal/modalPerito.jsx";
import { getCliente, samplePeritos, sampleRequerimientos } from "../data.js";
import { useNavigate } from 'react-router-dom'

// ⏳ Función de formato de tiempo
function fmt(t) {
  const n = Math.max(0, Math.floor(t / 1000));
  const h = String(Math.floor(n / 3600)).padStart(2, "0");
  const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0");
  const s = String(n % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// ⏱️ Componente de cuenta regresiva
function Countdown({ until }) {
  const [left, setLeft] = useState(until - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(until - Date.now()), 1000);
    return () => clearInterval(id);
  }, [until]);
  return (
    <span className="badge info"  style={{fontSize: "18px"}}>
      {left > 0 ? `⏳ ${fmt(left)}` : "Vencido"}
    </span>
  );
}

export default function Perito({ peritoId }) {
  const perito = samplePeritos.find((p) => p.id == peritoId);
  const navigate = useNavigate()
  const [requerimientos, setRequerimientos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("Asignado");
  const [cliente, setCliente] = useState(null);

  // ✅ Siempre refrescar requerimientos de este perito
  useEffect(() => {
  const misReqs = sampleRequerimientos.filter((r) => r.peritoId == peritoId);
  setRequerimientos(misReqs);
}, [peritoId]);


  // ✅ Manejo de decisiones en modal
  const handleDecision = (id, decision, extraData = {}) => {
    setRequerimientos((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;

        if (decision === "aceptar") {
          return { ...r, estado: "En curso" };
        }

        if (decision === "rechazar") {
          return { ...r, estado: "Rechazado" };
        }

        if (decision === "finalizado") {
          // Actualizar el requerimiento en sampleRequerimientos con todas las evidencias
          const updatedReq = { 
            ...r, 
            estado: "Finalizado", 
            gps: extraData.gps,
            fotos: extraData.photoFiles || [],
            video: extraData.videoFile,
            pdf: extraData.reportFile,
            postVisitHours: extraData.postVisitHours || r.postVisitHours,
            observaciones: extraData.observaciones || r.observaciones
          };
          
          // Actualizar también en sampleRequerimientos
          const index = sampleRequerimientos.findIndex(req => req.id === id);
          if (index !== -1) {
            sampleRequerimientos[index] = updatedReq;
          }
          
          return updatedReq;
        }

        return r; 
      })
    );
    setSelected(null);
  };


  const filteredReqs = requerimientos.filter((r) => r.estado === tab);

  return (
    <div className="container">
      {/* Perfil del perito */}
      {perito && (
        <div className="perfil" style={{ marginBottom: "10px", fontSize: "20px"}}>
          <h2>👤 Perfil del Perito</h2>
          <p><strong>Nombre:</strong> {perito.nombre}</p>
          <p><strong>Teléfono:</strong> {perito.telefono}</p>
          <p><strong>Disponible:</strong> {perito.disponible ? "Sí" : "No"}</p>
        </div>
      )}

      {/* Pestañas */}
      <div className="tabs">
        {["Asignado", "En curso", "Finalizado"].map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
             style={{fontSize: "20px"}}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Lista filtrada */}
      <div className="list">
        {filteredReqs.length === 0 ? (
          <div className="small"  style={{fontSize: "20px"}}>No hay requerimientos en {tab}</div>
        ) : (
          filteredReqs.map((r) => {
            const asignacion = new Date(r.fechaAsignacion).getTime();
            const globalDeadline =
              asignacion + r.plazoDias * 24 * 3600 * 1000;
            return (
              <div
                key={r.id}
                className="item"
                style={{fontSize: "22px"}}
                onClick={() => {
                  if (r.estado === "Finalizado") {
                    navigate(`/requerimiento/${r.id}`)
                  } else if (r.estado === "En curso") {
                    navigate(`/perito-en-curso/${r.id}`)
                  } else {
                    setSelected(r)
                  }
                }}
              >
                <div>
                  <strong>
                    {r.id}.- Cliente: {getCliente(r.clienteId).nombre}
                  </strong>
                  <div className="small"  style={{fontSize: "18px"}}>{r.direccion}</div>
                </div>
                <div className="row" >
                  <span className="badge info"  style={{fontSize: "15px"}}>{r.estado}</span>
                  <Countdown until={globalDeadline} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <ModalPerito
        selected={selected}
        cliente={getCliente(selected)}
        onClose={() => setSelected(null)}
        onDecision={handleDecision}
      />
    </div>
  );
}
