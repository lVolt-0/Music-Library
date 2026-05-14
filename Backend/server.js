const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // has kütüphanesi
const jwt = require('jsonwebtoken'); // token kütüphanesi
const multer = require('multer'); // fotoğraf yükleme kütüphanesi
const db = require('./config/db');

const app = express();
const PORT = 3000;

const SECRET_KEY = "Must_Be_The_Water"; // token için anahtar kelime

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // dosyaya fotoğraf yolla
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // doya isimlerini değiştir
    }
});
const upload = multer({ storage: storage });


app.post('/api/auth/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const profilePicPath = req.file ? '/uploads/' + req.file.filename : null;
        // bcrypt ile şifre hashleme
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await db.baglanti;

        await pool.request()// kullanııc ekleme
            .input('username', username)
            .input('passwordHash', hashedPassword)
            .input('profilePic', profilePicPath)
            .query(`
                INSERT INTO Users (Username, PasswordHash, ProfilePicture) 
                VALUES (@username, @passwordHash, @profilePic)
            `);

        res.status(201).json({ mesaj: "Kullanıcı oluşturuldu." });

    } catch (hata) {
        console.error("Kayıt hatası:", hata);
        // var olan kullanıcı adı hatası
        res.status(500).json({ mesaj: "Kayıt işlemi başarısız. Bu kullanıcı adı alınmış olabilir." });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = await db.baglanti;

        const sonuc = await pool.request()// veritababnından kullanıcı ara
            .input('username', username)
            .query('SELECT * FROM Users WHERE Username = @username');

        const user = sonuc.recordset[0];

        if (!user) {
            return res.status(401).json({ mesaj: "Böyle bir kullanıcı bulunamadı!" });
        }

const verifyToken = (req, res, next) => {// token kontrolü
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ mesaj: "Erişim reddedildi. Mührün yok!" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ mesaj: "Geçersiz veya süresi dolmuş mühür!" });
        
        req.user = user; 
        next();
    });
};


app.get('/api/music', verifyToken, async (req, res) => {// veritabanından şarkı almak için
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
});


app.post('/api/music', verifyToken, async (req, res) => {// veritabanına şarkı eklemek için
    try {
        const { songName, genre, artist, album } = req.body;
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

app.delete('/api/music/:songName', verifyToken, async (req, res) => {// şarkı silmek için
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
});

        res.status(201).json({ mesaj: "Şarkı kütüphanene başarıyla eklendi!" });
    } catch (hata) {
        console.error("Şarkı ekleme hatası:", hata);
        res.status(500).json({ mesaj: "Şarkı eklenemedi. Bu şarkı zaten listende olabilir." });
    }
});

        // şifre kontrolü
        const sifreDogruMu = await bcrypt.compare(password, user.PasswordHash);

        if (!sifreDogruMu) {
            return res.status(401).json({ mesaj: "Hatalı şifre girdiniz!" });
        }

        const token = jwt.sign(
            { username: user.Username, role: user.UserRole }, 
            SECRET_KEY, 
            { expiresIn: '10m' } // token süresi 10 dk
        );

        res.json({//html için girdi
            mesaj: "Giriş başarılı!",
            token: token,
            user: {
                username: user.Username,
                profilePicture: user.ProfilePicture,
                role: user.UserRole
            }
        });

    } catch (hata) {
        console.error("Giriş hatası:", hata);
        res.status(500).json({ mesaj: "Sunucu hatası oluştu." });
    }
});

// Sunucuyu Başlatma
app.listen(PORT, () => {
    console.log(`Sunucu açıldı. http://localhost:${PORT}`);
});