const express = require('express');
const cors = require('cors');
require('dotenv').config();

// TO DO: Import pustaka 'swagger-ui-express' dan 'swagger-jsdoc' di sini.

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/* 
 * TO DO: Konfigurasi Swagger Definition dan Middleware
 * 1. Buat variabel 'swaggerOptions' yang berisi detail API kamu (title, version, description).
 * 2. Set servers url ke 'http://localhost:3000'.
 * 3. Set properti 'apis' untuk membaca rute di ['./routes/*.js'].
 * 4. Panggil swaggerJsDoc() dan masukkan options-nya.
 * 5. Gunakan app.use() untuk memasang UI Swagger di rute '/api-docs'.
 */


app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================`);
  console.log(`Server API menyala di port: ${PORT}`);
  console.log(`Ketik 'ipconfig' (Windows) atau 'ifconfig' (Mac/Linux) di terminal baru.`);
  console.log(`Cari IPv4 Address kamu (misal: 192.168.1.5).`);
  console.log(`Nanti Frontend akan menembak ke: http://<IPv4_KAMU>:${PORT}`);
  
  // Baris ini akan muncul jika tahap UI Swagger sudah selesai
  console.log(`Cek Dokumentasi Swagger UI di: http://localhost:${PORT}/api-docs`);
  console.log(`========================================`);
});