const sql = require('mssql/msnodesqlv8'); 

const config = {
    server: 'LAPTOP-R3N3UD00\\SQLEXPRESS',
    database: 'MusicLibraryDB',
    driver: 'SQL Server',
    options: {
        trustedConnection: true, 
        trustServerCertificate: true 
    }
};

const baglanti = new sql.ConnectionPool(config).connect()
    .then(pool => {
        console.log("Veritabanına bağlanıldı.");
        return pool;
    })
    .catch(err => {
        console.error("Veritabanı bağlantı hatası: ", err);
    });

module.exports = {
    sql,
    baglanti
};