const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${process.env.THINGSPEAK_CHANNEL_ID}/feeds.json?api_key=${process.env.THINGSPEAK_READ_API_KEY}&results=20`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de ThingSpeak' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});