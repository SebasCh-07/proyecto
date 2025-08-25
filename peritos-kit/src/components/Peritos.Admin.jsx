// PeritosAdmin.jsx
import { useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // 👈 importamos useLocation
import { FaArrowLeft } from "react-icons/fa"
import { samplePeritos } from '../data.js'
import ModalAdmin from './Modal/modalAdmin.jsx'

export default function PeritosAdmin() {
    const [query, setQuery] = useState('')
    const [peritoSeleccionado, setPeritoSeleccionado] = useState(null)
    const navigate = useNavigate()
    const location = useLocation() // 👈 recibimos datos enviados con navigate
    const cliente = location.state?.cliente || null // 👈 cliente recibido

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
            </div>

            {/* 👉 Mostrar cliente si fue enviado */}
            {cliente && (
                <div style={{marginTop:"10px", padding:"10px", border:"1px solid #ccc", borderRadius:"8px"}}>
                    <h3>Asignar un perito al cliente:</h3>
                    <p>{cliente.nombre}</p>
                    <p>📞 {cliente.telefono}</p>
                    <p>📧 {cliente.correo}</p>
                </div>
            )}

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

            {/* 👇 Pasamos el cliente también al modal */}
            {peritoSeleccionado && (
                <ModalAdmin 
                  p={peritoSeleccionado} 
                  cliente={cliente}   // 👈 cliente recibido va al modal
                  onClose={() => setPeritoSeleccionado(null)} 
                />
            )}
        </div>
    )
}
