const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mesaj: "Sunucu Çalışıyor!" });
});

app.get('/api/albums', async (req, res) => {
    try {
        const pool = await db.baglanti;

        const sonuc = await pool.request().query(`
            SELECT 
                a.AlbumID, 
                a.AlbumName, 
                a.CoverImage, 
                a.ReleaseDate, 
                ar.ArtistName,
                ar.Biography
            FROM Albums a
            JOIN Artists ar ON a.ArtistID = ar.ArtistID
        `);

        res.json(sonuc.recordset);
        
    } catch (hata) {
        console.error("Albümleri çekerken hata oluştu: ", hata);
        res.status(500).json({ mesaj: "Veritabanından veriler çekilemedi." });
    }
});

// Sunucuyu Dinlemeye Başlama
app.listen(PORT, () => {
    console.log(`Sunucu ayaklandı! Tarayıcıda şu adrese git: http://localhost:${PORT}`);
});