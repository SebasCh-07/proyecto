import { useMemo, useState } from 'react'
import { sampleClientes, removeCliente } from '../data.js'
import ModalCliente from "./Modal/modalCliente.jsx"
import { useNavigate } from "react-router-dom"

export default function ClientesAdmin() {
    const [query, setQuery] = useState('')
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [clienteEliminar, setClienteEliminar] = useState(null)
    const [clientesState, setClientesState] = useState(sampleClientes)
    const navigate = useNavigate()

    const filteredClientes = useMemo(() => {
        const q = query.toLowerCase()
        return clientesState.filter(p =>
            p.nombre.toLowerCase().includes(q) ||
            p.id.toString().includes(q)
        )
    }, [query, clientesState])

    const abrirModal = (cliente) => setClienteSeleccionado(cliente)
    const cerrarModal = () => setClienteSeleccionado(null)

    // 🔹 abrir confirmación
    const abrirConfirmacion = (cliente) => {
        setClienteEliminar(cliente)
        setShowConfirm(true)
    }

    // 🔹 cerrar confirmación
    const cerrarConfirmacion = () => {
        setClienteEliminar(null)
        setShowConfirm(false)
    }

    // 🔹 confirmar eliminación
    const confirmarEliminar = () => {
        if (clienteEliminar) {
            removeCliente(clienteEliminar.id) // quita de data.js
            setClientesState(prev => prev.filter(c => c.id !== clienteEliminar.id)) // quita del estado
        }
        cerrarConfirmacion()
    }

    return (
        <div>
            <div className="header">
                <button
                    className="btn primary"
                    onClick={() => navigate("/clientes/nuevo")}
                    style={{ fontSize: "20px" }}
                >
                    + Agregar Cliente
                </button>

                <div className="row">
                    <input
                        style={{ fontSize: "20px" }}
                        className="input"
                        placeholder='🔍 Buscar cliente (ej: "Reisac")'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="list">
                {filteredClientes.map(c => (
                    <div
                        key={c.id}
                        className="item"
                        style={{fontSize: "20px"}}
                    >
                        <div onClick={() => abrirModal(c)} style={{ cursor: "pointer", flex: 1 }}>
                            <div className="font-semibold mb-2">{c.nombre}</div>
                            <div className="small text-muted" style={{fontSize: "18px"}}>CI: {c.id}</div>
                            <div className="small text-muted" style={{fontSize: "18px"}}>Ver peritos y asignar</div>
                        </div>

                        <div className="row gap-4">
                            <span className="badge info" style={{fontSize: "17px"}}>Cliente</span>
                            <button
                                className="btn primary"
                                onClick={() => abrirConfirmacion(c)}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <span className="small text-muted" style={{ fontSize: "12px", fontWeight: "bold", color: "black" }}>✖</span>
                            </button>
                        </div>
                    </div>
                ))}
                {filteredClientes.length === 0 && (
                    <div className="card text-center text-muted">
                        No se encontraron clientes
                    </div>
                )}
            </div>

            {/* Modal info cliente */}
            {clienteSeleccionado && (
                <ModalCliente
                    cliente={clienteSeleccionado}
                    onClose={cerrarModal}
                />
            )}

            {/* Modal confirmación */}
            {showConfirm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3 className="mb-4">¿Eliminar cliente?</h3>
                        <p className="text-muted mb-6">Esta acción no se puede deshacer.</p>
                        <div className="row" style={{ justifyContent: "flex-end", gap: "12px" }}>
                            <button className="btn secondary" onClick={cerrarConfirmacion}>Cancelar</button>
                            <button className="btn danger" onClick={confirmarEliminar}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
