import { useMemo, useState } from 'react'
import { sampleClientes } from '../data.js'
import ModalCliente from "./Modal/modalCliente.jsx"
import { useNavigate } from "react-router-dom"

export default function ClientesAdmin() {
    const [query, setQuery] = useState('')
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
    const navigate = useNavigate()

    const clientes = sampleClientes

    const filteredClientes = useMemo(() => {
        const q = query.toLowerCase()
        return clientes.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            p.id.toString().includes(q)
        )
    }, [query, clientes])

    const abrirModal = (cliente) => setClienteSeleccionado(cliente)
    const cerrarModal = () => setClienteSeleccionado(null)

    return (
        <div>
            <div className="header">
                {/* 🔹 Botón que reemplaza el h3 */}
                <button 
                  className="btn primary" 
                  onClick={() => navigate("/clientes/nuevo")}
                >
                  + Agregar Cliente
                </button>

                <div className="row">
                    <input
                        className="input"
                        placeholder='🔍 Buscar cliente (ej: "Reisac")'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="list">
                {filteredClientes.map(c => (
                    <div key={c.id} className="item" onClick={() => abrirModal(c)}>
                        <div>
                            <strong>{c.nombre}</strong>
                            <div className="small">Ver peritos y asignar</div>
                        </div>
                        <span className="badge info">Cliente</span>
                    </div>
                ))}
                {filteredClientes.length === 0 && <div className="card">No hay resultados</div>}
            </div>

            {clienteSeleccionado && (
                <ModalCliente
                    cliente={clienteSeleccionado}
                    onClose={cerrarModal}
                />
            )}
        </div>
    )
}
