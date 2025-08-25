// components/AgregarPerito.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { addPerito } from "../data.js"

export default function AgregarPerito() {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [id, setId] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!id || !nombre || !telefono) {
      alert("Completa todos los campos")
      return
    }
    addPerito({
      id: Number(id),
      nombre,
      telefono,
      disponible: true,   // 👈 siempre disponible
      perito: Date.now()
    })
    navigate(-1) // vuelve a la lista de peritos
  }

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
        <h3 style={{ margin: 0 }}>Nuevo Perito</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: "15px", display: "grid", gap: "10px" }}>
        <input
          type="number"
          placeholder="ID / Cédula"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  )
}
