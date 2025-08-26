// 🏗️ Clases (Modelos)
export class Cliente {
  constructor({ id, nombre, telefono, correo, peritoId = null, contacto }) {
    this.id = id
    this.nombre = nombre
    this.telefono = telefono
    this.correo = correo
    this.peritoId = peritoId // puede ser null
    this.contacto = contacto 
  }
}

export class Perito {
  constructor({ id, nombre, disponible, telefono, clienteId = null, requerimientoIds = [], username, password }) {
    this.id = id
    this.nombre = nombre
    this.disponible = disponible
    this.telefono = telefono
    this.clienteId = clienteId // puede ser null
    this.requerimientoIds = requerimientoIds // array de ids
    this.username = username
    this.password = password
  }
}


export class Requerimiento {
  constructor({ id, clienteId = null, peritoId = null, direccion, estado, fechaAsignacion, plazoDias, postVisitHours, gps = null, fotos = [], video = null, pdf = null, observaciones = '', archivoAsignacion = null }) {
    this.id = id
    this.clienteId = clienteId // puede ser null
    this.peritoId = peritoId   // puede ser null
    this.direccion = direccion
    this.estado = estado
    this.fechaAsignacion = fechaAsignacion
    this.plazoDias = plazoDias
    this.postVisitHours = postVisitHours
    this.gps = gps
    this.fotos = fotos
    this.video = video
    this.pdf = pdf
    this.observaciones = observaciones
    this.archivoAsignacion = archivoAsignacion // Archivo Excel/PDF enviado al asignar
  }
}

// 📦 Datos iniciales
export let sampleClientes = [
  new Cliente({ id: 1234526789, nombre: 'Reisac', telefono: '+593 99 111 1111', correo: "email@test.com", peritoId: 1753999364, contacto: "Reisac" }),
  new Cliente({ id: 2654556565, nombre: 'Inmobiliaria Quito', telefono: '+593 99 111 1111', correo: "email@test.com", peritoId: null, contacto: "Juan Jose" }),
  new Cliente({ id: 3316554165, nombre: 'Alfa Properties', telefono: '+593 99 111 1111', correo: "email@test.com", peritoId: 3025445485, contacto: "David Guetta" }),
]

export let samplePeritos = [
  new Perito({ 
    id: 1753999364, 
    nombre: 'Juan Pérez', 
    disponible: true, 
    telefono: '+593 99 111 1111', 
    clienteId: 1234526789, 
    requerimientoIds: [101],
    username: "perito1",
    password: "peritopass"
  }),
  new Perito({ 
    id: 1234567890, 
    nombre: 'María Gómez', 
    disponible: false, 
    telefono: '+593 98 222 2222', 
    clienteId: null, 
    requerimientoIds: [],
    username: "perito2",
    password: "clave123"
  }),
  new Perito({ 
    id: 3025445485, 
    nombre: 'Carlos Ruiz', 
    disponible: true, 
    telefono: '+593 97 333 3333', 
    clienteId: 3316554165, 
    requerimientoIds: [102],
    username: "perito3",
    password: "ruizpass"
  }),
  new Perito({ 
    id: 7889654223, 
    nombre: 'Ana Torres', 
    disponible: true, 
    telefono: '+593 96 444 4444', 
    clienteId: null, 
    requerimientoIds: [],
    username: "perito4",
    password: "torres123"
  }),
];

export let sampleRequerimientos = [
  new Requerimiento({
    id: 101,
    clienteId: 1234526789,
    peritoId: 1753999364,
    direccion: 'Av. Amazonas 123, Quito',
    estado: 'Asignado',
    fechaAsignacion: new Date().toISOString(),
    plazoDias: 4,
    postVisitHours: 24,
    archivoAsignacion: '/documentos/requerimiento-101.pdf' // Archivo PDF de ejemplo
  }),
  new Requerimiento({
    id: 102,
    clienteId: 2654556565,
    peritoId: 3025445485,
    direccion: 'Calle 10 de Agosto 55, Quito',
    estado: 'En curso',
    fechaAsignacion: new Date(Date.now() - 36*3600*1000).toISOString(),
    plazoDias: 3,
    postVisitHours: 12,
    archivoAsignacion: '/documentos/requerimiento-102.xlsx' // Archivo Excel de ejemplo
  }),
  // Requerimiento finalizado de ejemplo con evidencias
  new Requerimiento({
    id: 103,
    clienteId: 3316554165,
    peritoId: 7889654223,
    direccion: 'Av. Naciones Unidas 456, Quito',
    estado: 'Finalizado',
    fechaAsignacion: new Date(Date.now() - 72*3600*1000).toISOString(),
    plazoDias: 5,
    postVisitHours: 36,
    gps: { lat: -0.180653, lng: -78.467834, acc: 15 },
    fotos: [],
    video: null,
    pdf: null,
    observaciones: 'Visita completada satisfactoriamente. Se encontró el inmueble en buen estado.',
    archivoAsignacion: '/documentos/requerimiento-103.pdf' // Archivo PDF de ejemplo
  }),
]

// 🔹 CRUD
export function addCliente(cliente) {
  sampleClientes = [...sampleClientes, new Cliente(cliente)]
}

export function removeCliente(id) {
  sampleClientes = sampleClientes.filter(c => c.id !== id)
}

export function getCliente(idC) {
  const cliente = sampleClientes.find(c => c.id === idC)
  return cliente
}

export function getPerito(idP) {
  const perito = samplePeritos.find(c => c.id === idP)
  return perito
}

export function addPerito(perito) {
  samplePeritos.push(new Perito(perito))
}

export function addRequerimiento(req) {
  sampleRequerimientos.push(new Requerimiento(req))
}

// 🔎 Funciones utilitarias de relaciones

// Traer un cliente con su perito (si existe)
export function getClienteConPerito(clienteId) {
  const cliente = sampleClientes.find(c => c.id === clienteId)
  if (!cliente) return null

  const perito = cliente.peritoId
    ? samplePeritos.find(p => p.id === cliente.peritoId)
    : null

  return { ...cliente, perito }
}

// Traer un perito con su cliente y requerimientos (si existen)
export function getPeritoConRequerimientos(peritoId) {
  const perito = samplePeritos.find(p => p.id === peritoId)
  if (!perito) return null

  const cliente = perito.clienteId
    ? sampleClientes.find(c => c.id === perito.clienteId)
    : null

  const requerimientos = perito.requerimientoIds.map(rid =>
    sampleRequerimientos.find(r => r.id === rid)
  ).filter(Boolean)

  return { ...perito, cliente, requerimientos }
}

// Traer un requerimiento con cliente y perito
export function getRequerimientoCompleto(reqId) {
  const req = sampleRequerimientos.find(r => r.id === reqId)
  if (!req) return null

  const cliente = req.clienteId
    ? sampleClientes.find(c => c.id === req.clienteId)
    : null

  const perito = req.peritoId
    ? samplePeritos.find(p => p.id === req.peritoId)
    : null

  return { ...req, cliente, perito }
}

export function asignarRequerimiento({ clienteId, peritoId, direccion, estado = 'Asignado', plazoDias = 3, postVisitHours = 24, archivoAsignacion = null }) {
  const cliente = sampleClientes.find(c => c.id === clienteId)
  const perito = samplePeritos.find(p => p.id === peritoId)
  if (!cliente || !perito) return null

  // Crear ID único para el nuevo requerimiento
  const id = Date.now() // simple, puedes mejorar generador de IDs

  // Crear nuevo requerimiento
  const nuevoReq = new Requerimiento({
    id,
    clienteId,
    peritoId,
    direccion,
    estado,
    fechaAsignacion: new Date().toISOString(),
    plazoDias,
    postVisitHours,
    archivoAsignacion
  })

  // Guardar en la lista de requerimientos
  sampleRequerimientos.push(nuevoReq)

  // Actualizar relaciones
  cliente.peritoId = peritoId
  perito.clienteId = clienteId
  perito.requerimientoIds.push(id)

  return nuevoReq
}
