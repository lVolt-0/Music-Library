const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); // Swagger arayüz kütüphanesi
const swaggerDocument = require('./config/swagger.json');

const authRoutes = require('./routes/authRoutes');
const musicRoutes = require('./routes/musicRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

// Rotaları Bağlama
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

// Swagger Dokümantasyon Arayüzünü Bağlama
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sunucuyu Başlatma ve Test etmek için
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
    });
}

module.exports = app;