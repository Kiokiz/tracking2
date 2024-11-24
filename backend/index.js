const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Untuk menangani body JSON

// Rute untuk menerima data GPS
app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and Longitude are required');
  }

  console.log(`Received GPS data: Latitude = ${latitude}, Longitude = ${longitude}`);
  res.status(200).send('Location updated successfully');
});

// Rute default untuk cek server
app.get('/', (req, res) => {
  res.send('Welcome to GPS Tracker!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
