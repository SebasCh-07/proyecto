import { useState, useEffect } from 'react'
import Modal from '../Modal.jsx'
import { sampleClientes } from '../../data.js'
import { asignarRequerimiento } from '../../data.js'

export default function ModalAdmin({ p, cliente, onClose }) {
    const [assignOpen, setAssignOpen] = useState(false)

    const clientes = sampleClientes

    // Estado para formulario de asignación
    const [form, setForm] = useState({
        clienteId: cliente?.id || '',       // seleccionamos cliente si viene
        contacto: cliente?.contacto || '',    // contacto por defecto el nombre del cliente
        telefono: cliente?.telefono || '',
        pdf: null,
        excel: null
    })

    // Si cambia el cliente recibido, actualizar form
    useEffect(() => {
        if (cliente) {
            setForm({
                clienteId: cliente.id,
                contacto: cliente.contacto,
                telefono: cliente.telefono,
                pdf: null,
                excel: null
            })
        }
    }, [cliente])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (files) {
            setForm(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setForm(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleAsignar = () => {
    if (!form.clienteId) return alert('Selecciona un cliente')
    
    const req = asignarRequerimiento({
        clienteId: form.clienteId,
        peritoId: p.id,
        direccion: 'Dirección del requerimiento', // puedes pedir input si quieres
        plazoDias: 3,
        postVisitHours: 24
    })

    setAssignOpen(false)
    alert(`Requerimiento asignado al cliente ${clientes.find(c => c.id === form.clienteId)?.nombre} con perito ${p.nombre}`)
}

    return (
        <div>
            <Modal open={!!p} onClose={onClose} title={p ? `Opciones: Perito ${p.nombre}` : ''}>
                {p && (
                    <div className='flex flex-col'>
                        <div style={{ marginBottom: "25px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>Nombre:</div>
                                <div>{p.nombre}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>CI:</div>
                                <div>{p.id}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{ fontWeight: "700" }}>Teléfono:</div>
                                <div>{p.telefono}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <button className="btn" onClick={() => setAssignOpen(true)} style={{fontSize: "20px"}}>➕ Asignar requerimiento</button>
                            <button className="btn secondary" onClick={() => window.open('https://maps.google.com', '_blank')} style={{fontSize: "20px"}}>📍 Ver en mapa</button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal open={assignOpen} onClose={() => setAssignOpen(false)} title="Asignar requerimiento">
                <div style={{ display: 'grid', gap: 15, fontSize: "20px" }}>
                    <label className="label" style={{fontSize: "20px"}}>Cliente</label>
                    <select name="clienteId" value={form.clienteId} onChange={handleChange}  style={{fontSize: "20px"}}>
                        <option value="">-- Seleccionar cliente --</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>

                    <label className="label"  style={{fontSize: "20px"}}>Contacto en sitio (nombre)</label>
                    <input 
                        name="contacto" 
                        className="input" 
                        placeholder="Nombre del contacto" 
                        value={form.contacto} 
                        onChange={handleChange} 
                         style={{fontSize: "20px"}}
                    />

                    <label className="label"  style={{fontSize: "20px"}}>Teléfono</label>
                    <input 
                        name="telefono" 
                        className="input" 
                        placeholder="099..." 
                        value={form.telefono} 
                        onChange={handleChange} 
                         style={{fontSize: "20px"}}
                    />

                    <label className="label"  style={{fontSize: "20px"}}>Adjuntar PDF</label>
                    <input type="file" accept=".pdf" name="pdf" onChange={handleChange}  style={{fontSize: "20px"}}/>

                    <label className="label"  style={{fontSize: "20px"}}>Adjuntar Excel</label>
                    <input type="file" accept=".xls,.xlsx" name="excel" onChange={handleChange}  style={{fontSize: "20px"}}/>

                    <div className="separator" />
                    <div className="row" style={{ justifyContent: 'flex-end', fontSize: "20px" }}>
                        <button className="btn secondary" onClick={() => setAssignOpen(false)}  style={{fontSize: "20px"}}>Cancelar</button>
                        <button className="btn success" onClick={handleAsignar}  style={{fontSize: "20px"}}>Asignar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
