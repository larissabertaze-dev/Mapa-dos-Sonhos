const map = L.map('map').setView([-15.7801, -47.9292], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.on('click', function(e) {
  const dream = prompt("Qual é seu sonho nesse lugar?");
  if (!dream) return;

  const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  marker.bindPopup(dream);

  saveDream({
    id: Date.now(),
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    text: dream
  });

  renderDreamList();
});