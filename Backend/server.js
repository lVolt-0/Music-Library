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