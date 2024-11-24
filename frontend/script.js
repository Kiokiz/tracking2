// Inisialisasi peta dengan Leaflet.js
var map = L.map('map').setView([0, 0], 13); // Titik awal (0,0)

// Set Tile Layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([0, 0]).addTo(map); // Marker pertama di (0,0)

// Fungsi untuk mengambil data GPS dari server
setInterval(function() {
  fetch('http://localhost:3000/location')  // Ganti dengan URL backend Anda jika sudah di-deploy
    .then(response => response.json())
    .then(data => {
      // Update posisi marker dan peta
      var latLng = new L.LatLng(data.latitude, data.longitude);
      marker.setLatLng(latLng);
      map.setView(latLng, 13);
    })
    .catch(error => console.error('Error fetching location data:', error));
}, 10000); // Ambil data setiap 10 detik

