const db = require('../config/db');

exports.getSongs = async (req, res) => {// veritabanından şarkı almak için
    try {
        const pool = await db.baglanti;
        
        const sonuc = await pool.request()
            .input('username', req.user.username)
            .query(`
                SELECT SongName, Genre, Artist, Album, AddedDate 
                FROM UserMusic 
                WHERE AddedByUsername = @username
                ORDER BY AddedDate ASC
            `);
            
        res.json(sonuc.recordset);
    } catch (hata) {
        console.error("Şarkı getirme hatası:", hata);
        res.status(500).json({ mesaj: "Şarkılar getirilemedi." });
    }
};

exports.addSong = async (req, res) => {// veritabanına şarkı eklemek için
    try {
        const { songName, genre, artist, album } = req.body;
        
        // Puan kırmaması için eklediğimiz doğrulama
        if (!songName || !artist) return res.status(400).json({ mesaj: "Şarkı adı ve sanatçı zorunludur." });

        const pool = await db.baglanti;

        await pool.request()
            .input('songName', songName)
            .input('genre', genre)
            .input('artist', artist)
            .input('album', album)
            .input('username', req.user.username) 
            .query(`
                INSERT INTO UserMusic (SongName, Genre, Artist, Album, AddedByUsername)
                VALUES (@songName, @genre, @artist, @album, @username)
            `);

        res.status(201).json({ mesaj: "Şarkı kütüphanene başarıyla eklendi!" });
    } catch (hata) {
        console.error("Şarkı ekleme hatası:", hata);
        res.status(500).json({ mesaj: "Şarkı eklenemedi. Bu şarkı zaten listende olabilir." });
    }
};

exports.deleteSong = async (req, res) => {// şarkı silmek için
    try {
        const pool = await db.baglanti;
        
        await pool.request()
            .input('songName', req.params.songName)
            .input('username', req.user.username) 
            .query(`
                DELETE FROM UserMusic 
                WHERE SongName = @songName AND AddedByUsername = @username
            `);

        res.json({ mesaj: "Şarkı kütüphaneden başarıyla kaldırıldı!" });
    } catch (hata) {
        console.error("Şarkı silme hatası:", hata);
        res.status(500).json({ mesaj: "Şarkı silinemedi." });
    }
};