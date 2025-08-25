import { useState } from 'react'
import Modal from '../Modal.jsx'
import { sampleClientes } from '../../data.js'


export default function ModalAdmin({ p, onClose }) {
    const [assignOpen, setAssignOpen] = useState(false)

    const clientes = sampleClientes


    return (
        <div>
            <Modal open={!!p} onClose={onClose} title={p ? `Opciones: Perito ${p.perito}` : ''}>
                {p && (
                    <div className='flex flex-col'>
                        <div style={{ marginBottom: "25px" }}>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{fontWeight: "700"}}>Nombre:</div>
                                <div>{p.nombre}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{fontWeight: "700"}}>CI:</div>
                                <div>{p.id}</div>
                            </div>
                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <div style={{fontWeight: "700"}}>Teléfono:</div>
                                <div>{p.telefono}</div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <button className="btn" onClick={() => setAssignOpen(true)}>➕ Asignar requerimiento</button>
                            <button className="btn secondary" onClick={() => alert('Abrir historial de visitas e informes (maquetado)')}>🗂 Historial de visitas / informes</button>
                            <button className="btn secondary" onClick={() => window.open('https://maps.google.com', '_blank')}>📍 Ver en mapa</button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal open={assignOpen} onClose={() => setAssignOpen(false)} title="Asignar requerimiento">
                <div style={{ display: 'grid', gap: 10 }}>
                    <label className="label">Cliente</label>
                    <select>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>

                    <label className="label">Contacto en sitio (nombre)</label>
                    <input className="input" placeholder="Nombre del contacto" />

                    <label className="label">Teléfono</label>
                    <input className="input" placeholder="099..." />

                    <label className="label">Adjuntar PDF</label>
                    <input type="file" accept=".pdf" />

                    <label className="label">Adjuntar Excel</label>
                    <input type="file" accept=".xls,.xlsx" />

                    <div className="separator" />
                    <div className="row" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn secondary" onClick={() => setAssignOpen(false)}>Cancelar</button>
                        <button className="btn success" onClick={() => { setAssignOpen(false); alert('Requerimiento asignado (maquetado)') }}>Asignar</button>
                    </div>
                </div>
            </Modal>
        </div>

    )
}