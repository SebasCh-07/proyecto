// --- UTIL: simple DB in localStorage ---
const DBKEY = 'peritosDB_v1';
const now = () => new Date().toISOString();
const loadDB = () => {
  const raw = localStorage.getItem(DBKEY);
  if (raw) return JSON.parse(raw);
  // Seed data
  const seedDeadline = Date.now() + 3*24*3600*1000; // 3 días
  const postDeadline = Date.now() + 36*3600*1000; // 36h
  const db = {
    user:null,
    reqs:[
      {id:'r1', cliente:'Reisac', contacto:'Juan Piguave', tel:'0999999999', perito:'perito1',
       estado:'pendiente', created: now(), deadline: seedDeadline, postDeadline: postDeadline,
       adj:['Asignacion_Reisac.pdf','Formato_Levantamiento.xlsx'], loc:null, checkinAt:null, tiempoSitio:0, informe:null
      },
      {id:'r2', cliente:'BancoX', contacto:'María Rojas', tel:'022345678', perito:'perito1',
       estado:'curso', created: now(), deadline: Date.now()+2*24*3600*1000, postDeadline: Date.now()+24*3600*1000,
       adj:['Asignacion_BancoX.pdf'], loc:{lat:-0.1807,lng:-78.4678}, checkinAt: now(), tiempoSitio:4200, informe:null
      },
      {id:'r3', cliente:'Constructora Y', contacto:'Carlos Vega', tel:'023334455', perito:'perito2',
       estado:'finalizado', created: now(), deadline: Date.now()-24*3600*1000, postDeadline: Date.now()-3600*1000,
       adj:['Asignacion_ConstructoraY.pdf'], loc:{lat:-2.2038,lng:-79.8975}, checkinAt: now(), tiempoSitio:3600, informe:'InformeY.pdf'
      }
    ]
  };
  localStorage.setItem(DBKEY, JSON.stringify(db));
  return db;
};
const saveDB = (db) => localStorage.setItem(DBKEY, JSON.stringify(db));
let DB = loadDB();

// --- Auth simulation ---
function setUser(role, name){
  DB.user = {role, name};
  saveDB(DB);
}
function logout(){
  DB.user = null;
  saveDB(DB);
  window.location.href = 'index.html';
}
function ensureRole(roles){
  if(!DB.user){ window.location.href = 'index.html'; return; }
  if(!roles.includes(DB.user.role)){ document.body.innerHTML='<div class="container"><h1>Sin permiso</h1></div>'; }
}

// --- Helpers ---
function fmtDate(ts){
  const d = new Date(ts);
  return d.toLocaleString();
}
function fmtCountdown(ms){
  if (ms < 0) return '00:00:00';
  const s = Math.floor(ms/1000);
  const hh = String(Math.floor(s/3600)).padStart(2,'0');
  const mm = String(Math.floor((s%3600)/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');
  return `${hh}:${mm}:${ss}`;
}

// Funciones de renderizado
const renderClientes = () => {
  // Lógica para renderizar clientes
};

const renderPeritos = () => {
  const tbody = document.querySelector('#tablaPeritos tbody');
  tbody.innerHTML = '';

  // Lista fija de peritos disponibles
  const peritosDisponibles = [
    { nombre: 'perito1', contacto: 'Carlos Mendoza', telefono: '0991234567' },
    { nombre: 'perito2', contacto: 'Ana López', telefono: '0987654321' },
    { nombre: 'perito3', contacto: 'Miguel Torres', telefono: '0976543210' },
    { nombre: 'perito4', contacto: 'Sofía Ramírez', telefono: '0965432109' }
  ];

  // Renderizar la tabla de peritos
  peritosDisponibles.forEach(perito => {
    const tr = document.createElement('tr');
    tr.classList.add('clickable-row');
    tr.innerHTML = `<td>${perito.nombre}</td>
                   <td>${perito.contacto}</td>
                   <td>${perito.telefono}</td>`;
    tbody.appendChild(tr);

    // Agregar funcionalidad a las filas clickeables
    tr.onclick = () => {
      localStorage.setItem('peritoSel', perito.nombre);
      location.href = 'perito-historial.html'; // Redirigir al historial del perito
    };
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop(); // Definir la variable path aquí

  // Logout button (any page that has it)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Login
  if (path === 'index.html' || path === ''){
    const form = document.getElementById('loginForm');
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const user = document.getElementById('user').value.trim().toLowerCase();
      const role = user === 'admin' ? 'admin' : (user === 'perito1' ? 'perito' : null);
      setUser(role, user);
      location.href = role === 'admin' ? 'clientes-admin.html' : 'perito-dashboard.html';
    });
  }

  // Admin Clientes
  if (path === 'clientes-admin.html'){
    ensureRole(['admin']);
    renderClientes();
  }

  // Admin Peritos
  if (path === 'peritos-admin.html'){
    ensureRole(['admin']);
    renderPeritos();
  }

  // Historial de Perito
  if (path === 'perito-historial.html') {
    const peritoNombre = localStorage.getItem('peritoSel');
    const tbody = document.querySelector('#tablaHistorial tbody');
    tbody.innerHTML = '';

    // Filtrar los requerimientos por el perito seleccionado
    const requerimientos = DB.reqs.filter(req => req.perito === peritoNombre);

    // Renderizar la tabla de historial
    requerimientos.forEach(req => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${req.cliente}</td>
                      <td>${req.contacto}</td>
                      <td>${req.tel}</td>
                      <td>
                          <button class="button" data-ver="${req.id}">Ver Requerimientos</button>
                      </td>`;
      tbody.appendChild(tr);

      // Agregar funcionalidad al botón "Ver Requerimientos"
      tr.querySelector('[data-ver]').onclick = () => {
        localStorage.setItem('reqSel', req.id);
        location.href = 'admin-requerimientos.html';
      };
    });
  }

  // Admin Requerimientos
  if (path === 'admin-requerimientos.html'){
    ensureRole(['admin']);
    const form = document.getElementById('formReq');
    if (form) {
      form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const r = {
          id: 'r' + Math.random().toString(36).slice(2,7),
          cliente: document.getElementById('cliNombre').value.trim(),
          contacto: document.getElementById('cliContacto').value.trim(),
          tel: document.getElementById('cliTelefono').value.trim(),
          perito: document.getElementById('cliPerito').value,
          estado:'pendiente',
          created: now(),
          deadline: Date.now() + (parseInt(document.getElementById('cliPlazo').value||'3')*24*3600*1000),
          postDeadline: Date.now() + 36*3600*1000,
          adj: Array.from(document.getElementById('cliAdj').files).map(f=>f.name),
          loc:null, checkinAt:null, tiempoSitio:0, informe:null
        };
        DB.reqs.unshift(r); saveDB(DB);
        renderReqs();
        toast('Requerimiento creado y asignado a ' + r.perito);
        form.reset();
      });
    }
    function renderReqs(){
      const tbody = document.querySelector('#tablaReqs tbody');
      tbody.innerHTML='';
      DB.reqs.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.cliente}</td><td>${r.perito}</td><td>${r.estado}</td>
        <td>
          <button class="button" data-ver="${r.id}">Ver</button>
          <button class="button" data-rem="${r.id}">Eliminar</button>
        </td>`;
        tbody.appendChild(tr);
      });
      tbody.querySelectorAll('[data-rem]').forEach(b=>b.onclick=()=>{
        DB.reqs = DB.reqs.filter(x=>x.id!==b.dataset.rem); saveDB(DB); renderReqs();
      });
      tbody.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>{
        localStorage.setItem('reqSel', b.dataset.ver);
        location.href='perito-detalle.html';
      });
    }
    renderReqs();
  }

  const renderClientes = () => {
  const tbody = document.querySelector('#tablaClientes tbody');
  tbody.innerHTML = '';

  // Agrupar requerimientos por cliente
  const clientesMap = {};
  DB.reqs.forEach(req => {
    if (!clientesMap[req.cliente]) {
      clientesMap[req.cliente] = {
        nombre: req.cliente,
        contacto: req.contacto,
        telefono: req.tel,
        activos: 0
      };
    }
    if (req.estado === 'pendiente' || req.estado === 'curso') {
      clientesMap[req.cliente].activos++;
    }
  });

  // Renderizar la tabla
  Object.values(clientesMap).forEach(cli => {
    const tr = document.createElement('tr');
    tr.classList.add('clickable-row');
    tr.innerHTML = `
      <td>${cli.nombre}</td>
      <td>${cli.contacto}</td>
      <td>${cli.telefono}</td>
      <td>${cli.activos}</td>
    `;
    tbody.appendChild(tr);

    // Al hacer clic en un cliente → redirigir para asignar perito
    tr.onclick = () => {
      localStorage.setItem('cliSel', cli.nombre);
      location.href = 'peritos-admin.html';
    };
  });
};

  // ... (rest of the code remains unchanged)
});
