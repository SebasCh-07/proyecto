function openTab(tab) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
}

function openModal(name) {
  document.getElementById("modal").style.display = "block";
  if (name) document.getElementById("modal-title").innerText = "Opciones para " + name;
}

function openRequerimiento(cliente) {
  document.getElementById("requerimiento").style.display = "block";
  document.getElementById("req-title").innerText = "Requerimiento - " + cliente;
}

function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

// Cronómetro
let timerInterval;
function iniciarCronometro() {
  let sec = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    sec++;
    let min = Math.floor(sec / 60);
    let s = sec % 60;
    document.getElementById("cronometro").innerText = 
      (min < 10 ? "0" : "") + min + ":" + (s < 10 ? "0" : "") + s;
  }, 1000);
}

// Geolocalización
function marcarLlegada() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      document.getElementById("ubicacion").innerText = 
        `Ubicación: Lat ${pos.coords.latitude}, Lng ${pos.coords.longitude}`;
    });
  } else {
    alert("Geolocalización no soportada");
  }
}
