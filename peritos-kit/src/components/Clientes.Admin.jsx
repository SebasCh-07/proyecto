import { useMemo, useState } from 'react'
import { sampleClientes, removeCliente } from '../data.js'
import { useNavigate } from "react-router-dom"

export default function ClientesAdmin() {
    const [query, setQuery] = useState('')
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

    const navegarAHistorial = (cliente) => {
        navigate("/historial-cliente", { state: { cliente } })
    }

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
        <div style={{ fontSize: "18px" }}>
            <h1 style={{ 
                fontSize: "35px",
                textAlign: "center",
                marginBottom: "24px"
            }}>Clientes</h1>
            
            <div className="header" style={{
                flexDirection: "column",
                gap: "16px"
            }}>
                <button
                    className="btn success"
                    onClick={() => navigate("/clientes/nuevo")}
                    style={{ 
                        fontSize: "20px",
                        width: "100%",
                        maxWidth: "300px",
                        margin: "0 auto"
                    }}
                >
                    + Agregar Cliente
                </button>
                <div style={{ width: "100%" }}>
                    <input
                        style={{ 
                            fontSize: "20px",
                            width: "100%",
                            maxWidth: "400px"
                        }}
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
                        style={{ 
                            fontSize: "20px",
                            cursor: "pointer"
                        }}
                    >
                        <div 
                            onClick={() => navegarAHistorial(c)} 
                            style={{ 
                                cursor: "pointer", 
                                flex: 1,
                                width: "100%"
                            }}
                        >
                            <div className="font-semibold mb-2" style={{
                                fontSize: "22px",
                                marginBottom: "8px"
                            }}>
                                {c.nombre}
                            </div>
                            <div className="small text-muted" style={{ 
                                fontSize: "18px",
                                marginBottom: "4px"
                            }}>
                                CI: {c.id}
                            </div>
                            <div className="small text-muted" style={{ 
                                fontSize: "16px",
                                color: "#64748b"
                            }}>
                                Ver historial y peritos
                            </div>
                        </div>

                        <div className="row gap-4" style={{
                            gap: "12px",
                            alignItems: "center"
                        }}>
                            <span className="badge info" style={{ 
                                fontSize: "17px",
                                whiteSpace: "nowrap"
                            }}>
                                Cliente
                            </span>
                            <button
                                className="btn danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    abrirConfirmacion(c);
                                }}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: "44px",
                                    minHeight: "44px"
                                }}
                                aria-label="Eliminar cliente"
                            >
                                <span style={{ 
                                    fontSize: "16px", 
                                    fontWeight: "bold", 
                                    color: "white" 
                                }}>
                                    ✖
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
                {filteredClientes.length === 0 && (
                    <div className="card text-center text-muted" style={{
                        padding: "40px 20px",
                        fontSize: "18px"
                    }}>
                        No se encontraron clientes
                    </div>
                )}
            </div>

            {/* Modal de confirmación */}
            {showConfirm && (
                <div className="modal-backdrop">
                    <div className="modal" style={{
                        maxWidth: "400px",
                        textAlign: "center"
                    }}>
                        <h3 style={{ marginBottom: "20px" }}>
                            ¿Eliminar cliente?
                        </h3>
                        <p style={{ marginBottom: "24px" }}>
                            ¿Estás seguro de que quieres eliminar a <strong>{clienteEliminar?.nombre}</strong>?
                            Esta acción no se puede deshacer.
                        </p>
                        <div style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}>
                            <button
                                className="btn secondary"
                                onClick={cerrarConfirmacion}
                                style={{ minWidth: "120px" }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn danger"
                                onClick={confirmarEliminar}
                                style={{ minWidth: "120px" }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
