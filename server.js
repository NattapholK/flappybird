const express = require('express');
const path = require('path');

const app = express();

// Railway จะกำหนด PORT ให้เราเอง, แต่ถ้าทดลองรันในเครื่องจะใช้ 3000
const port = process.env.PORT || 3000;

// บอกให้เซิร์ฟเวอร์รู้ว่าไฟล์เกมทั้งหมด (index.html, etc.) อยู่ในโฟลเดอร์ชื่อ 'public'
app.use(express.static(path.join(__dirname, 'public')));

// สั่งให้เซิร์ฟเวอร์เริ่มทำงาน และแสดงข้อความเมื่อพร้อม
app.listen(port, () => {
  console.log(`Server is ready and listening on port ${port}`);
});