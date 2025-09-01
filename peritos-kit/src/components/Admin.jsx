import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClientesAdmin from "./Clientes.Admin.jsx"

export default function Admin(){
  const [tab, setTab] = useState('clientes')
  const navigate = useNavigate()
  
  return (
    <div className="container">
      {/* Header con navegación */}
      <div style={{ 
        marginBottom: "32px", 
        textAlign: "center" 
      }}>
        <h1 style={{ 
          fontSize: "32px", 
          margin: "0 0 24px 0", 
          color: "var(--text)",
          fontWeight: 700
        }}>
          🏢 Panel de Administración
        </h1>
        
        {/* Navegación rápida */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px"
        }}>
          <button
            onClick={() => navigate("/clientes")}
            className="btn success"
            style={{ fontSize: "18px", padding: "12px 24px" }}
          >
            👥 Clientes
          </button>
          <button
            onClick={() => navigate("/requerimientos")}
            className="btn success"
            style={{ fontSize: "18px", padding: "12px 24px" }}
          >
            📋 Requerimientos
          </button>
          <button
            onClick={() => navigate("/crear-requerimiento")}
            className="btn primary"
            style={{ fontSize: "18px", padding: "12px 24px" }}
          >
            ➕ Crear Requerimiento
          </button>
          <button
            onClick={() => navigate("/agregar-perito")}
            className="btn primary"
            style={{ fontSize: "18px", padding: "12px 24px" }}
          >
            👨‍💼 Agregar Perito
          </button>
        </div>
      </div>

      {/* Pestañas locales */}
      <div className="tabs" style={{ marginBottom: "24px" }}>
        <div 
          className={['tab', tab==='clientes' && 'active'].filter(Boolean).join(' ')} 
          onClick={()=>setTab('clientes')}
          style={{ fontSize: "18px", padding: "12px 24px" }}
        >
          👥 Clientes
        </div>
      </div>

      {tab==='clientes' && (
        <ClientesAdmin/>
      )}
    </div>
  )
}
