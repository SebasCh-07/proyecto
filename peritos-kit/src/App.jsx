import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import Perito from './components/Perito.jsx'
import ClientesAdmin from './components/Clientes.Admin.jsx'
import NuevoCliente from './components/NuevoCliente.jsx'
import NuevoPerito from './components/AgregarPerito.jsx'
import MobileMenu from './components/MobileMenu.jsx'

import HistorialCliente from './components/HistorialCliente.jsx'
import logo from "./components/img/logo.png"


import DetalleCliente from './components/detalleCliente.jsx'
import RequerimientoDetalle from './components/RequerimientoDetalle.jsx'
import RequerimientoDetalleAdminPerito from './components/RequerimientoDetalleAdminPerito.jsx'
import Requerimientos from './components/Requerimientos.jsx'
import CrearRequerimiento from './components/CrearRequerimiento.jsx'
import PeritoEnCurso from './components/peritoEnCurso.jsx'
import img from "./components/img/perito.jpg"
import { useNavigate } from "react-router-dom"


export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [peritoId, setPeritoId] = useState(localStorage.getItem('peritoId') || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogin = (role, id) => {
    setRole(role);
    if (id) setPeritoId(id);
  };

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    if (peritoId) localStorage.setItem('peritoId', peritoId);
  }, [role, peritoId]);


  useEffect(() => {
    if (role) localStorage.setItem('role', role)
  }, [role])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!role) {
    return <Login onLogin={handleLogin} />
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
        <div className="header" style={{
          borderBottom: "none",
          marginBottom: "24px",
          paddingBottom: "0"
        }}>
          {/* Logo + nombre */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flex: 1,
            justifyContent: isMobile ? "flex-start" : "flex-start"
          }}>
            {/* Botón hamburguesa para móvil */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#005eff",
                  padding: "8px",
                  marginRight: "8px"
                }}
              >
                ☰
              </button>
            )}
            
            <img
              src={logo}
              alt="Logo"
              style={{ 
                height: isMobile ? "50px" : "70px", 
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
            <div style={{marginBottom: 15}}>
              <h1 style={{ 
                fontSize: isMobile ? "16px" : "24px", 
                margin: 0,
                fontWeight: 700,
                color: "var(--text)",
              }}>
                Plataforma Peritos
              </h1>
              <span className="badge info" style={{ marginTop: "4px", fontSize: isMobile ? "12px" : "14px"}}>
                {role === 'admin' ? 'Administrador' : 'Perito'}
              </span>
            </div>
          </div>

          {/* Botones de navegación - solo en escritorio */}
          {!isMobile && (
            <div className="row" style={{ 
              gap: "12px", 
              marginTop: "0",
              flexWrap: "nowrap"
            }}>
              {role === 'admin' && (
                <button
                  onClick={() => navigate("/clientes")}
                  style={{fontSize: "20px"}}
                  className="btn success"
                >
                  Clientes
                </button>
              )}

              {role === 'admin' && (
                <button
                  onClick={() => navigate("/requerimientos")}
                  style={{fontSize: "20px"}}
                  className="btn success"
                >
                  Requerimientos
                </button>
              )}
              <button
                className="btn secondary"
                onClick={() => {
                  setRole('');
                  localStorage.removeItem('role');
                }}
                style={{fontSize: "20px"}}
              >
                Salir
              </button>
            </div>
          )}
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
                {/* <Route path="/peritos" element={<PeritosAdmin />} /> */}
                <Route path="/agregar-perito" element={<NuevoPerito />} />
                <Route path="/requerimientos" element={<Requerimientos />} />
                <Route path="/crear-requerimiento" element={<CrearRequerimiento />} />


                <Route path="/detalleCliente/:clienteId" element={<DetalleCliente />} />
                <Route path="/historial-cliente" element={<HistorialCliente />} />
                <Route path="/requerimiento/:id" element={<RequerimientoDetalleAdminPerito />} />
              </>
            )}

            {/* Perito */}
            {role === 'perito' && (
              <>
                {/* 👇 aquí pasamos el peritoId */}
                <Route path="/" element={<Perito peritoId={peritoId} />} />
                <Route path="/requerimiento/:id" element={<RequerimientoDetalle />} />
                <Route path="/perito-en-curso/:id" element={<PeritoEnCurso />} />
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

      {/* Menú móvil */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        role={role}
      />
    </div>
  )
}
