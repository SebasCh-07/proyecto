// PeritosAdmin.jsx
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa"
import { samplePeritos } from '../data.js'
import ModalAdmin from './Modal/modalAdmin.jsx'

export default function PeritosAdmin() {
    const [query, setQuery] = useState('')
    const [peritoSeleccionado, setPeritoSeleccionado] = useState(null)
    const navigate = useNavigate()

    const peritos = samplePeritos

    const filteredPeritos = useMemo(() => {
        const q = query.toLowerCase()
        return peritos.filter(p => 
            p.nombre.toLowerCase().includes(q) || 
            p.id.toString().includes(q) 
        )
    }, [query, peritos])

    return (
        <div>
            <div className="header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "22px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <FaArrowLeft />
                </button>

                {/* 👉 Botón para ir al formulario */}
                <button 
                  onClick={() => navigate("/agregar-perito")} 
                  className="btn"
                >
                  + Agregar Perito
                </button>
            </div>

            <div className="row" style={{ marginTop: "10px", marginBottom: "10px" }}>
                <input 
                    style={{paddingRight: "20px"}}
                    className="input" 
                    placeholder="🔍 Buscar perito (nombre o cédula)" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                />
            </div>

            <div className="list">
                {filteredPeritos.map(p => (
                    <div key={p.id} className="item" onClick={() => setPeritoSeleccionado(p)}>
                        <div>
                            <strong>{p.nombre}</strong>
                            <div className="small">📞 {p.telefono}</div>
                            <div className="small">🆔 {p.id}</div>
                        </div>
                        <span className={['badge', p.disponible ? 'ok' : 'no'].join(' ')}>
                            {p.disponible ? '✔ Disponible' : '❌ No disponible'}
                        </span>
                    </div>
                ))}
                {filteredPeritos.length === 0 && <div className="card">No hay resultados</div>}
            </div>

            {peritoSeleccionado && <ModalAdmin p={peritoSeleccionado} onClose={() => setPeritoSeleccionado(null)} />}
        </div>
    )
}
