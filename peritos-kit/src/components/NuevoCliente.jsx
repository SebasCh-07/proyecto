import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addCliente } from "../data.js"   // 👈 importar función

export default function NuevoCliente() {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevo = {
      id: Date.now(),
      nombre,
      telefono,
      correo,
    }

    addCliente(nuevo)   // 👈 guardar en data.js

    navigate("/clientes") // volver a la lista
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h3>Nuevo Cliente</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <button type="submit" className="btn primary">Guardar</button>
        <button type="button" className="btn" onClick={() => navigate("/clientes")}>
          Cancelar
        </button>
      </form>
    </div>
  )
}
