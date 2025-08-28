import { useNavigate } from "react-router-dom";
import { samplePeritos } from "../data.js"; // Importar los peritos
import { useMemo, useState } from 'react'

const peritos = samplePeritos

export default function HistorialPerito() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('')

  const filteredPeritos = useMemo(() => {
    const q = query.toLowerCase()
    return peritos.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.id.toString().includes(q)
    )
  }, [query, peritos])

  return (
    <div style={{ fontSize: "18px" }}>
      <h1>Lista de Peritos</h1>
      <div className="header">
        <button
          onClick={() => navigate("/agregar-perito")}
          style={{ fontSize: "20px" }}
          className="btn primary"
        >
          + Agregar Perito
        </button>

        <div className="row">
          <input
            style={{ fontSize: "20px" }}
            className="input"
            placeholder='🔍 Buscar Perito'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="list" style={{ marginTop: '20px' }}>
        <div className="list">
          {filteredPeritos.map(p => (
            <div
              key={p.id}
              className="card"
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                fontSize: "18px"
              }}
              onClick={() => navigate(`/listaClientesHistorial/${p.id}`)}
            >
              <div>
                <strong style={{ fontSize: "20px" }}>{p.nombre}</strong>
                <div className="small" style={{ fontSize: "18px" }}>📞 {p.telefono}</div>
                <div className="small" style={{ fontSize: "18px" }}>🆔 {p.id}</div>
              </div>
              <span className={['badge', p.disponible ? 'ok' : 'no'].join(' ')} style={{ fontSize: "16px", marginTop: "10px" }}>
                {p.disponible ? '✔ Disponible' : '❌ No disponible'}
              </span>
            </div>
          ))}
          {filteredPeritos.length === 0 && <div className="card">No hay resultados</div>}
        </div>
      </div>

      <button
        style={{
          backgroundColor: '#005eff',
          color: 'white',
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px",
          fontSize: '20px'
        }}
        onClick={() => navigate("/clientes")} // 👈 regresa a la página anterior
      >
        Regresar
      </button>
    </div>
  )
}
