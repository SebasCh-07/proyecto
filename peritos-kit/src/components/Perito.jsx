import { useState } from "react"
import ModalPerito from "./Modal/modalPerito.jsx"
import { sampleRequerimientos } from "../data.js"

function fmt(t) {
  const n = Math.max(0, Math.floor(t / 1000))
  const h = String(Math.floor(n / 3600)).padStart(2, "0")
  const m = String(Math.floor((n % 3600) / 60)).padStart(2, "0")
  const s = String(n % 60).padStart(2, "0")
  return `${h}:${m}:${s}`
}

function Countdown({ until }) {
  const [left, setLeft] = useState(until - Date.now())
  useState(() => {
    const id = setInterval(() => setLeft(until - Date.now()), 1000)
    return () => clearInterval(id)
  }, [until])
  return (
    <span className="badge info">
      {left > 0 ? `⏳ ${fmt(left)}` : "Vencido"}
    </span>
  )
}

export default function Perito() {
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState("Asignado")
  const [requerimientos, setRequerimientos] = useState(sampleRequerimientos)

  const handleDecision = (id, decision) => {
    setRequerimientos((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, estado: decision === "aceptar" ? "En curso" : "Finalizado" }
          : r
      )
    )
    setSelected(null)
  }

  const filteredReqs = requerimientos.filter((r) => r.estado === tab)

  return (
    <div className="container">
      <div className="header">
        <h2 style={{ margin: 0 }}>Panel Perito</h2>
      </div>

      {/* Pestañas */}
      <div className="tabs">
        {["Asignado", "En curso", "Finalizado"].map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Lista filtrada */}
      <div className="list">
        {filteredReqs.length === 0 ? (
          <div className="small">No hay requerimientos en {tab}</div>
        ) : (
          filteredReqs.map((r) => {
            const asignacion = new Date(r.fechaAsignacion).getTime()
            const globalDeadline =
              asignacion + r.plazoDias * 24 * 3600 * 1000
            return (
              <div
                key={r.id}
                className="item"
                onClick={() => setSelected(r)}
              >
                <div>
                  <strong>
                    #{r.id} — {r.cliente}
                  </strong>
                  <div className="small">{r.direccion}</div>
                </div>
                <div className="row">
                  <span className="badge info">{r.estado}</span>
                  <Countdown until={globalDeadline} />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Modal */}
      <ModalPerito
        selected={selected}
        onClose={() => setSelected(null)}
        onDecision={handleDecision}
      />
    </div>
  )
}
