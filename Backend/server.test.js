const request = require('supertest');
const app = require('./server');//sunucuyu çağırma
const db = require('./config/db'); // Veritabanı dosyamızı da teste dahil ediyoruz
const bcrypt = require('bcrypt');

afterAll(async () => {
    const pool = await db.baglanti;
    await pool.close();
});

describe('Güvenlik ve Kimlik Doğrulama Testleri', () => {

    test('1 Token yanlış ise 401 dönmeli', async () => {
        const response = await request(app).get('/api/music');
        
        expect(response.status).toBe(401); //beklenen durum erişm reddi
       expect(response.body.mesaj).toBe('Erişim reddedildi. Mührün yok!'); //beklenen mesaj
    });

    test('2 Sahte token gönderilirse 403 dönmeli', async () => {
        const response = await request(app)
            .get('/api/music')
            .set('Authorization', 'Bearer Mus_das_sein'); // Sahte token ekleme
        
        // Beklenti
        expect(response.status).toBe(403); //403 (Geçersiz Token) dönmeli
        expect(response.body.mesaj).toBe('Geçersiz token!');

        
    });

    test('3 Şifre hashleme fonksiyonu düzgün çalışmalı', async () => {
        const sifre = 'Test';
        const hash = await bcrypt.hash(sifre, 10);
        
        const eslesiyormu = await bcrypt.compare(sifre, hash);
        expect(eslesiyormu).toBe(true);
    });

});