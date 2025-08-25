// data.js
export const samplePeritos = [
  { id: 1753999364, nombre: 'Juan Pérez', disponible: true, telefono: '+593 99 111 1111', perito: 1 },
  { id: 1234567890, nombre: 'María Gómez', disponible: false, telefono: '+593 98 222 2222', perito: 2 },
  { id: 3025445485, nombre: 'Carlos Ruiz', disponible: true, telefono: '+593 97 333 3333', perito: 3 },
  { id: 7889654223, nombre: 'Ana Torres', disponible: true, telefono: '+593 96 444 4444', perito: 4 },
];

// ⚡ mutable: se podrá modificar en tiempo de ejecución
export function addPerito(perito) {
  samplePeritos.push(perito)
}

export let sampleClientes = [
  { id: 1234526789, nombre: 'Reisac', telefono: '+593 99 111 1111', correo:"email@test.com"},
  { id: 2654556565, nombre: 'Inmobiliaria Quito', telefono: '+593 99 111 1111', correo:"email@test.com" },
  { id: 3316554165, nombre: 'Alfa Properties', telefono: '+593 99 111 1111', correo:"email@test.com" },
];

export const sampleRequerimientos = [
  {
    id: 101,
    cliente: 'Reisac',
    direccion: 'Av. Amazonas 123, Quito',
    estado: 'Asignado',
    fechaAsignacion: new Date().toISOString(),
    plazoDias: 4,
    postVisitHours: 24,
  },
  {
    id: 102,
    cliente: 'Inmobiliaria Quito',
    direccion: 'Calle 10 de Agosto 55, Quito',
    estado: 'En curso',
    fechaAsignacion: new Date(Date.now() - 36*3600*1000).toISOString(),
    plazoDias: 3,
    postVisitHours: 12,
  },
];

export function addCliente(cliente) {
  sampleClientes = [...sampleClientes, cliente]
}
