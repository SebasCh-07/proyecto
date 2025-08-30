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
    <div className="container">
      <div className="header" style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "16px",
        marginBottom: "24px"
      }}>
        <button 
          onClick={() => navigate("/historial-perito")} 
          className="btn secondary"
          style={{
            fontSize: "18px",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FaArrowLeft />
        </button>
        <h3 style={{ 
          margin: 0, 
          fontSize: "24px",
          flex: "1",
          textAlign: "center"
        }}>
          Nuevo Perito
        </h3>
      </div>

      <div className="card" style={{ 
        maxWidth: "600px", 
        margin: "0 auto",
        width: "100%"
      }}>
        <form onSubmit={handleSubmit} style={{ 
          display: "grid", 
          gap: "20px"
        }}>
          <div>
            <label className="label">ID / Cédula</label>
            <input
              type="number"
              placeholder="ID / Cédula"
              style={{fontSize: "18px"}}
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="label">Nombre Completo</label>
            <input
              type="text"
              placeholder="Nombre del perito"
              style={{fontSize: "18px"}}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="label">Teléfono</label>
            <input
              type="tel"
              placeholder="Número de teléfono"
              style={{fontSize: "18px"}}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="label">Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Username para login"
              style={{fontSize: "18px"}}
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="label">Contraseña</label>
            <input
              type="password"
              placeholder="Password para login"
              style={{fontSize: "18px"}}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div style={{
            display: "flex",
            gap: "16px",
            marginTop: "20px",
            flexWrap: "wrap"
          }}>
            <button 
              type="submit" 
              className="btn success" 
              style={{
                fontSize: "18px",
                flex: "1",
                minWidth: "120px",
                minHeight: "48px"
              }}
            >
              Guardar Perito
            </button>
            <button 
              type="button" 
              className="btn secondary" 
              onClick={() => navigate("/historial-perito")}
              style={{
                fontSize: "18px",
                flex: "1",
                minWidth: "120px",
                minHeight: "48px"
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
