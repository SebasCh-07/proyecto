import { useNavigate } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose, role }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('peritoId');
    window.location.reload();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
          onClick={onClose}
        />
      )}

      {/* Menú lateral */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1001,
          transition: 'left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header del menú */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', color: '#005eff' }}>
            📱 Menú
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            ✕
          </button>
        </div>

        {/* Opciones del menú */}
        <div style={{ flex: 1, padding: '20px 0' }}>
          {role === 'admin' && (
            <>
              <button
                onClick={() => handleNavigation('/clientes')}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#374151',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                👥 Clientes
              </button>
              <button
                onClick={() => handleNavigation('/requerimientos')}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#374151',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                📋 Requerimientos
              </button>
              <button
                onClick={() => handleNavigation('/crear-requerimiento')}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#374151',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                ➕ Crear Requerimiento
              </button>
              <button
                onClick={() => handleNavigation('/agregar-perito')}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#374151',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                👨‍💼 Agregar Perito
              </button>
            </>
          )}

          {role === 'perito' && (
            <button
              onClick={() => handleNavigation('/')}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#374151',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              🏠 Inicio
            </button>
          )}
        </div>

        {/* Footer con botón de salir */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: 'none',
              background: '#ef4444',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            🚪 Salir
          </button>
        </div>
      </div>
    </>
  );
}

