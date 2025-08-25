import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import Perito from './components/Perito.jsx'
import ClientesAdmin from './components/Clientes.Admin.jsx'
import NuevoCliente from './components/NuevoCliente.jsx'
import NuevoPerito from './components/AgregarPerito.jsx'
import PeritosAdmin from './components/Peritos.Admin.jsx'
import logo from "./components/img/logo.png"
import img from "./components/img/perito.jpg"


export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || '')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    if (role) localStorage.setItem('role', role)
  }, [role])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!role) {
    return <Login onLogin={setRole} />
  }

  return (
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f9" }}>

        {/* Columna izquierda (solo escritorio) */}
        {!isMobile && (
          <div
            style={{
              flex: "0 0 280px",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px) brightness(0.6)"
            }}
          />
        )}

        {/* Contenido central */}
        <div style={{
          flex: 1,
          backgroundColor: "white",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "12px" : "24px",
          boxShadow: isMobile ? "none" : "0 0 10px rgba(0,0,0,0.1)"
        }}>

          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingBottom: "12px",
            borderBottom: "1px solid #ddd",
            marginBottom: "20px"
          }}>
            {/* Logo + nombre */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
              justifyContent: isMobile ? "center" : "flex-start"
            }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: isMobile ? "50px" : "70px", objectFit: "contain" }}
              />
              <div>
                <strong style={{ fontSize: isMobile ? "16px" : "18px" }}>Plataforma Peritos</strong>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: isMobile ? "0" : "10px",
                    padding: "2px 8px",
                    fontSize: "12px",
                    backgroundColor: "#eaf1ff",
                    color: "#005eff",
                    borderRadius: "12px"
                  }}
                >
                  {role === 'admin' ? 'Admin' : 'Perito'}
                </div>
              </div>
            </div>

            {/* Botón salir */}
            <button
              style={{
                backgroundColor: '#005eff',
                color: 'white',
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: isMobile ? "10px" : "0"
              }}
              onClick={() => {
                setRole('');
                localStorage.removeItem('role');
              }}
            >
              Salir
            </button>
          </div>

          {/* Contenido dinámico según ruta */}
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Admin y sus páginas */}
              {role === 'admin' && (
                <>
                  <Route path="/" element={<Admin />} />
                  <Route path="/clientes" element={<ClientesAdmin />} />
                  <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                  <Route path="/peritos" element={<PeritosAdmin />} /> {/* 👈 Nueva ruta */}
                  <Route path="/perito" element={<Perito/>} />
                  <Route path="/agregar-perito" element={<NuevoPerito/>} />
                </>
              )}

              {/* Perito */}
              {role === 'perito' && (
                <>
                  <Route path="/" element={<Perito />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </div>
        </div>

        {/* Columna derecha (solo escritorio) */}
        {!isMobile && (
          <div
            style={{
              flex: "0 0 280px",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px) brightness(0.6)"
            }}
          />
        )}
      </div>
  )
}
