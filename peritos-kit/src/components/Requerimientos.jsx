import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { sampleRequerimientos, getCliente, getPerito, samplePeritos } from "../data.js";

export default function Requerimientos() {
  const navigate = useNavigate();
  
  // Estados para los filtros
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroPerito, setFiltroPerito] = useState('');
  const [busquedaTexto, setBusquedaTexto] = useState('');

  // Obtener todos los requerimientos con información completa
  const requerimientosCompletos = useMemo(() => 
    sampleRequerimientos.map(req => ({
      ...req,
      cliente: getCliente(req.clienteId),
      perito: getPerito(req.peritoId)
    })), [sampleRequerimientos]);

  // Función para filtrar requerimientos
  const requerimientosFiltrados = useMemo(() => {
    let filtrados = requerimientosCompletos;

    // Filtro por rango de fechas
    if (filtroFechaInicio) {
      filtrados = filtrados.filter(req => 
        new Date(req.fechaAsignacion) >= new Date(filtroFechaInicio)
      );
    }
    if (filtroFechaFin) {
      filtrados = filtrados.filter(req => 
        new Date(req.fechaAsignacion) <= new Date(filtroFechaFin)
      );
    }

    // Filtro por estado
    if (filtroEstado) {
      filtrados = filtrados.filter(req => req.estado === filtroEstado);
    }

    // Filtro por perito
    if (filtroPerito) {
      if (filtroPerito === 'sin-asignar') {
        filtrados = filtrados.filter(req => !req.peritoId);
      } else {
        filtrados = filtrados.filter(req => req.peritoId === parseInt(filtroPerito));
      }
    }

    // Filtro por texto (búsqueda en cliente, dirección, etc.)
    if (busquedaTexto) {
      const texto = busquedaTexto.toLowerCase();
      filtrados = filtrados.filter(req => 
        req.cliente?.nombre?.toLowerCase().includes(texto) ||
        req.direccion?.toLowerCase().includes(texto) ||
        req.perito?.nombre?.toLowerCase().includes(texto) ||
        req.id.toString().includes(texto)
      );
    }

    return filtrados;
  }, [requerimientosCompletos, filtroFechaInicio, filtroFechaFin, filtroEstado, filtroPerito, busquedaTexto]);

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroFechaInicio('');
    setFiltroFechaFin('');
    setFiltroEstado('');
    setFiltroPerito('');
    setBusquedaTexto('');
  };
  
  // Debug: mostrar información de los requerimientos
  console.log('Requerimientos en sampleRequerimientos:', sampleRequerimientos);
  console.log('Requerimientos completos:', requerimientosCompletos);
  console.log('Requerimientos filtrados:', requerimientosFiltrados);

  const handleRequerimientoClick = (reqId) => {
    console.log('Click en requerimiento:', reqId);
    console.log('Tipo de ID:', typeof reqId);
    console.log('Requerimiento encontrado:', sampleRequerimientos.find(r => r.id === reqId));
    console.log('URL de navegación:', `/requerimiento/${reqId}`);
    navigate(`/requerimiento/${reqId}`);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Finalizado':
        return 'ok';
      case 'En curso':
        return 'warning';
      case 'Asignado':
        return 'info';
      default:
        return 'info';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  

  const renderRequerimiento = (req) => (
    <div
      key={req.id}
      className="panel"
      style={{
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid #e2e8f0",
        borderRadius: "12px"
      }}
      onClick={() => handleRequerimientoClick(req.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#005eff" }}>
            Requerimiento #{req.id}
          </h3>
          <span className={`badge ${getEstadoColor(req.estado)}`} style={{ fontSize: "14px" }}>
            {req.estado}
          </span>
        </div>
        <div style={{ textAlign: "right", fontSize: "14px", color: "#64748b" }}>
          {formatDate(req.fechaAsignacion)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div>
          <strong style={{ color: "#374151" }}>Cliente:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.cliente?.nombre || 'N/A'}
          </p>
        </div>
                 <div>
           <strong style={{ color: "#374151" }}>Perito:</strong>
           <p style={{ margin: "4px 0", fontSize: "16px" }}>
             {req.perito ? req.perito.nombre : (
               <span style={{ color: "#ef4444", fontStyle: "italic" }}>⚠️ Sin asignar</span>
             )}
           </p>
         </div>
        <div>
          <strong style={{ color: "#374151" }}>Dirección:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.direccion}
          </p>
        </div>
        <div>
          <strong style={{ color: "#374151" }}>Plazo:</strong>
          <p style={{ margin: "4px 0", fontSize: "16px" }}>
            {req.plazoDias} días
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
           {req.perito ? (
             <span style={{ 
               backgroundColor: "#dcfce7", 
               color: "#166534", 
               padding: "4px 8px", 
               borderRadius: "6px", 
               fontSize: "12px",
               fontWeight: "500"
             }}>
               ✅ Asignado a {req.perito.nombre}
             </span>
           ) : (
             <span style={{ 
               backgroundColor: "#fef3c7", 
               color: "#92400e", 
               padding: "4px 8px", 
               borderRadius: "6px", 
               fontSize: "12px",
               fontWeight: "500"
             }}>
               ⏳ Pendiente de asignación
             </span>
           )}
         </div>
        
        <div style={{ 
          color: "#64748b", 
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          👆 Hacer clic para ver detalles
        </div>
      </div>
    </div>
  );

  return (
    <div className="card" style={{ padding: 24, maxWidth: 1200, margin: "0 auto", fontSize: "19px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn secondary" 
          style={{ marginRight: 16, fontSize: "17px" }}
        >
          ← Volver
        </button>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>📋 Lista de Requerimientos</h2>
        <button 
          onClick={() => navigate("/crear-requerimiento")} 
          className="btn primary" 
          style={{ marginLeft: "auto", fontSize: "18px" }}
        >
          ➕ Crear Requerimiento
        </button>
      </div>

      {/* Panel de Filtros */}
      <div className="panel" style={{ 
        padding: "20px", 
        marginBottom: "24px", 
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px"
      }}>
        <h3 style={{ fontSize: "18px", margin: "0 0 16px 0", color: "#374151" }}>
          🔍 Filtros de Búsqueda
        </h3>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "16px",
          marginBottom: "16px"
        }}>
          {/* Búsqueda por texto */}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              🔎 Búsqueda general
            </label>
            <input
              type="text"
              placeholder="Cliente, dirección, perito, ID..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          {/* Filtro por fecha inicio */}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              📅 Fecha desde
            </label>
            <input
              type="date"
              value={filtroFechaInicio}
              onChange={(e) => setFiltroFechaInicio(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          {/* Filtro por fecha fin */}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              📅 Fecha hasta
            </label>
            <input
              type="date"
              value={filtroFechaFin}
              onChange={(e) => setFiltroFechaFin(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          {/* Filtro por estado */}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              📊 Estado
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "white"
              }}
            >
              <option value="">Todos los estados</option>
              <option value="Asignado">Asignado</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          {/* Filtro por perito */}
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              👨‍💼 Perito asignado
            </label>
            <select
              value={filtroPerito}
              onChange={(e) => setFiltroPerito(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "white"
              }}
            >
              <option value="">Todos los peritos</option>
              <option value="sin-asignar">⚠️ Sin asignar</option>
              {samplePeritos.map(perito => (
                <option key={perito.id} value={perito.id}>
                  ✅ {perito.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={limpiarFiltros}
            className="btn secondary"
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            🗑️ Limpiar filtros
          </button>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            fontSize: "14px", 
            color: "#64748b",
            padding: "8px 12px",
            backgroundColor: "#f1f5f9",
            borderRadius: "6px"
          }}>
            📊 {requerimientosFiltrados.length} de {requerimientosCompletos.length} requerimientos
          </div>
        </div>
      </div>

      {/* Título de la sección */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: "20px", color: "#64748b", margin: 0 }}>
          📋 Requerimientos Filtrados ({requerimientosFiltrados.length})
        </h3>
      </div>

      {/* Contenido de requerimientos filtrados */}
      {requerimientosFiltrados.length === 0 ? (
        <div className="panel" style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: "20px", color: "#64748b" }}>
            {requerimientosCompletos.length === 0 
              ? "No hay requerimientos registrados." 
              : "No se encontraron requerimientos que coincidan con los filtros aplicados."
            }
          </p>
          {requerimientosCompletos.length > 0 && (
            <button
              onClick={limpiarFiltros}
              className="btn secondary"
              style={{ marginTop: "16px", fontSize: "16px" }}
            >
              🗑️ Limpiar filtros para ver todos
            </button>
          )}
        </div>
      ) : (
        <div className="list" style={{ display: "grid", gap: "16px" }}>
          {requerimientosFiltrados.map(renderRequerimiento)}
        </div>
      )}
    </div>
  );
}
