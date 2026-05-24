// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Роуты
const clientRoutes = require('./routes/clients');
const roomRoutes = require('./routes/rooms');
const checkinRoutes = require('./routes/checkins');
const serviceRoutes = require('./routes/services');
const employeesRoutes = require('./routes/employees');

app.use('/api/clients', clientRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/checkins', checkinRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/employees', employeesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Сервер гостиницы запущен на порту ${PORT}`);
});
