import { useMemo, useState } from 'react'
import { sampleClientes, removeCliente } from '../data.js'
import ModalCliente from "./Modal/modalCliente.jsx"
import { useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"   // 🗑️ icono

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
                    <div 
                      key={c.id} 
                      className="item" 
                      style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                    >
                        <div onClick={() => abrirModal(c)} style={{cursor:"pointer", display: "flex", flexDirection:"row"}} >
                        <div onClick={() => abrirModal(c)} style={{cursor:"pointer"}}>
                            <strong>{c.nombre}</strong>
                            <div className="small">CI: {c.id}</div>
                            <div className="small">Ver peritos y asignar</div>
                        </div>
                        <div style={{marginLeft: 250}}></div>
                        </div>

                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <span className="badge info">Cliente</span>
                            <Trash 
                              style={{cursor:"pointer", color:"red"}} 
                              onClick={() => abrirConfirmacion(c)} 
                            />
                        </div>
                    </div>
                ))}
                {filteredClientes.length === 0 && <div className="card">No hay resultados</div>}
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
                <div 
                  style={{
                    position:"fixed", top:0, left:0, right:0, bottom:0, 
                    background:"rgba(0,0,0,0.5)", display:"flex", 
                    alignItems:"center", justifyContent:"center"
                  }}
                >
                    <div style={{background:"white", padding:"20px", borderRadius:"8px", minWidth:"300px"}}>
                        <h3>¿Eliminar cliente?</h3>
                        <p>Esta acción no se puede deshacer.</p>
                        <div style={{display:"flex", justifyContent:"flex-end", gap:"10px", marginTop:"15px"}}>
                            <button onClick={cerrarConfirmacion}>Cancelar</button>
                            <button 
                              onClick={confirmarEliminar} 
                              style={{background:"red", color:"white", padding:"5px 10px", borderRadius:"5px"}}
                            >
                              Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
