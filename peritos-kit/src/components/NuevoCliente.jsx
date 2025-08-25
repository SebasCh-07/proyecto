import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addCliente } from "../data.js"   // 👈 importar función

export default function NuevoCliente() {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [id, setID] = useState("")
  const [correo, setCorreo] = useState("")
  const [contacto, setContacto] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevo = {
      id,
      nombre,
      telefono,
      correo,
      contacto
    }

    addCliente(nuevo)   // 👈 guardar en data.js

    navigate("/Login") // volver a la lista
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h3>Nuevo Cliente</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="text"
          placeholder="Cedula"
          value={id}
          onChange={(e) => setID(parseInt(e.target.value))}
          required
          style={{padding: 10}}
        />
        <input
          type="text"
          placeholder="Cliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{padding: 10}}
        />
        <input
          type="text"
          placeholder="Contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          required
          style={{padding: 10}}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          style={{padding: 10}}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{padding: 10}}
        />
        <button type="submit" className="btn primary">Guardar</button>
        <button type="button" className="btn" onClick={() => navigate("/clientes")}>
          Cancelar
        </button>
      </form>
    </div>
  )
}
