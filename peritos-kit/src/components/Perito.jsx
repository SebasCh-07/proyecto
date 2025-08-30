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
    <span className="badge info" style={{ fontSize: "18px" }}>
      {left > 0 ? `⏳ ${fmt(left)}` : "Vencido"}
    </span>
  );
}

export default function Perito({ peritoId, onLogout }) {
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
      {/* Header con botón Salir */}
      <div className="header" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <h2 style={{
          fontSize: "28px",
          margin: 0,
          color: "var(--text)",
          flex: "1",
          textAlign: "center"
        }}>
          👤 Panel del Perito
        </h2>
        <button
          className="btn secondary"
          onClick={onLogout}
          style={{
            fontSize: "18px",
            minWidth: "100px",
            minHeight: "44px"
          }}
        >
          Salir
        </button>
      </div>

      {/* Perfil del perito */}
      {perito && (
        <div className="perfil" style={{ 
          marginBottom: "24px", 
          fontSize: "20px",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex", 
            justifyContent: "center",
            marginBottom: "16px"
          }}>
            <h2 style={{
              fontSize: "28px",
              margin: 0,
              color: "var(--text)"
            }}>
              👤 Bienvenido {perito.nombre}
            </h2>
          </div>
          <div style={{
            display: "grid",
            gap: "8px",
            textAlign: "left",
            maxWidth: "400px",
            margin: "0 auto"
          }}>
            <p style={{ margin: "4px 0" }}>
              <strong>CI:</strong> {perito.id}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Teléfono:</strong> {perito.telefono}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Disponible:</strong> {perito.disponible ? "Sí" : "No"}
            </p>
          </div>
        </div>
      )}

      {/* Pestañas */}
      <div className="tabs" style={{
        justifyContent: "center",
        marginBottom: "24px"
      }}>
        {["Asignado", "En curso", "Finalizado"].map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
            style={{ 
              fontSize: "18px",
              minWidth: "100px",
              textAlign: "center"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Lista filtrada */}
      <div className="list">
        {filteredReqs.length === 0 ? (
          <div className="card text-center" style={{ 
            fontSize: "20px",
            padding: "40px 20px",
            color: "var(--muted)"
          }}>
            No hay requerimientos en {tab}
          </div>
        ) : (
          filteredReqs.map((r) => {
            const asignacion = new Date(r.fechaAsignacion).getTime();
            const globalDeadline =
              asignacion + r.plazoDias * 24 * 3600 * 1000;
            return (
              <div
                key={r.id}
                className="item"
                style={{ 
                  fontSize: "22px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => {
                  if (r.estado === "Finalizado") {
                    navigate(`/requerimiento/${r.id}`)
                  } else if (r.estado === "En curso") {
                    navigate(`/perito-en-curso/${r.id}`)
                  } else {
                    setSelected(r)
                  }
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow)";
                  }
                }}
              >
                <div style={{ flex: 1, width: "100%" }}>
                  <strong style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "20px"
                  }}>
                    {r.id}.- Cliente: {getCliente(r.clienteId).nombre}
                  </strong>
                  <div className="small" style={{ 
                    fontSize: "16px",
                    color: "var(--muted)",
                    marginBottom: "8px"
                  }}>
                    {r.direccion}
                  </div>
                </div>
                <div className="row" style={{
                  gap: "12px",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}>
                  <span className="badge info" style={{ 
                    fontSize: "15px",
                    whiteSpace: "nowrap"
                  }}>
                    {r.estado}
                  </span>
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
