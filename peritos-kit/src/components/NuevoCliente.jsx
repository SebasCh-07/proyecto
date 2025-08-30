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

    navigate("/clientes") // volver a la lista
  }

  return (
    <div className="card" style={{ 
      maxWidth: "100%", 
      margin: "0 auto", 
      padding: "20px", 
      fontSize: "20px",
      width: "100%"
    }}>
      <h3 style={{ 
        textAlign: "center", 
        marginBottom: "24px",
        fontSize: "24px"
      }}>Nuevo Cliente</h3>
      <form onSubmit={handleSubmit} style={{ 
        display: "grid", 
        gap: "16px",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        <div>
          <label className="label">Cédula</label>
          <input
            type="text"
            placeholder="Cedula"
            value={id}
            onChange={(e) => setID(parseInt(e.target.value))}
            required
            className="input"
            style={{ 
              padding: "12px 16px", 
              fontSize: "18px",
              width: "100%"
            }}
          />
        </div>
        <div>
          <label className="label">Nombre del Cliente</label>
          <input
            type="text"
            placeholder="Cliente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="input"
            style={{ 
              padding: "12px 16px", 
              fontSize: "18px",
              width: "100%"
            }}
          />
        </div>
        <div>
          <label className="label">Contacto</label>
          <input
            type="text"
            placeholder="Contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            required
            className="input"
            style={{ 
              padding: "12px 16px", 
              fontSize: "18px",
              width: "100%"
            }}
          />
        </div>
        <div>
          <label className="label">Teléfono</label>
          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="input"
            style={{ 
              padding: "12px 16px", 
              fontSize: "18px",
              width: "100%"
            }}
          />
        </div>
        <div>
          <label className="label">Correo Electrónico</label>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="input"
            style={{ 
              padding: "12px 16px", 
              fontSize: "18px",
              width: "100%"
            }}
          />
        </div>
        <div style={{
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "space-evenly", 
          marginTop: "20px",
          gap: "16px",
          flexWrap: "wrap"
        }}>
          <button 
            type="submit" 
            className="btn success" 
            style={{ 
              padding: "12px 24px", 
              fontSize: "18px",
              flex: "1",
              minWidth: "120px"
            }}
          >
            Guardar
          </button>
          <button 
            type="button" 
            className="btn secondary" 
            onClick={() => navigate("/clientes")} 
            style={{ 
              padding: "12px 24px", 
              fontSize: "18px",
              flex: "1",
              minWidth: "120px"
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
