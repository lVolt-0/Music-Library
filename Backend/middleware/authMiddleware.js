const jwt = require('jsonwebtoken'); // token kütüphanesi
const SECRET_KEY = "Must_Be_The_Water"; // token için anahtar kelime

const verifyToken = (req, res, next) => {// token kontrolü
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ mesaj: "Erişim reddedildi. Mührün yok!" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ mesaj: "Geçersiz token!" });
        
        req.user = user; 
        next();
    });
};

module.exports = { verifyToken, SECRET_KEY };