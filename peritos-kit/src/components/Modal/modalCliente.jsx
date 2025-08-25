import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal.jsx'

export default function ModalCliente({ cliente, onClose }) {
    const [assignOpen, setAssignOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div>
            <Modal 
                open={!!cliente} 
                onClose={onClose} 
                title={cliente ? `Opciones Cliente:  ${cliente.nombre}` : ''}
            >
                {cliente && (
                    <div className='flex flex-col'>
                        <div style={{ marginBottom: "25px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>CI:</div>
                                <div>{cliente.id}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>Teléfono:</div>
                                <div>{cliente.telefono}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>Correo:</div>
                                <div>{cliente.correo}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: 10 }}>
                            {/* 🔹 Ahora navega a /peritos */}
                            <button 
                                className="btn" 
                                onClick={() => navigate("/peritos")}
                            >
                                ➕ Asignar Perito
                            </button>

                            <button 
                                className="btn secondary" 
                                onClick={() => alert(`Historial del cliente ${cliente.nombre} (maquetado)`)}
                            >
                                🗂 Historial de cliente
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}
