// components/AgregarPerito.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { addPerito } from "../data.js"

export default function AgregarPerito() {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [id, setId] = useState("")
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
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
          onClick={() => navigate("/historial-perito")} 
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
        <h3 style={{ margin: 0, fontSize: "20px" }}>Nuevo Perito</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: "15px", display: "grid", gap: "10px", marginLeft: "400px", marginRight: "400px" }}>
        <input
          type="number"
          placeholder="ID / Cédula"
          style={{fontSize: "20px"}}
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Nombre"
           style={{fontSize: "20px"}}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Teléfono"
           style={{fontSize: "20px"}}
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="input"
        />
         <input
          type="text"
          placeholder="Username"
           style={{fontSize: "20px"}}
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
         <input
          type="text"
          placeholder="Password"
           style={{fontSize: "20px"}}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn" style={{marginBottom: "10px", fontSize: "20px", justifyContent: "center"}}>Guardar</button>
      </form>
    </div>
  )
}
