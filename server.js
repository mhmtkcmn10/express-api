// const express = require('express');
// const app = express();

// // Middleware - JSON formatında veri alabilmek için
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, Express.js!');
// });

// const users = []; // Geçici veri listesi

// // Tüm kullanıcıları getir
// app.get('/users', (req, res) => {
//     res.json(users);
// });

// // Yeni kullanıcı ekle
// app.post('/users', (req, res) => {
//     const newUser = { id: users.length + 1, name: req.body.name };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// // Belirli bir kullanıcıyı getir
// app.get('/users/:id', (req, res) => {
//     const user = users.find(u => u.id == req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
// });

// // Kullanıcıyı güncelle
// app.put('/users/:id', (req, res) => {
//     const user = users.find(u => u.id == req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     user.name = req.body.name;
//     res.json(user);
// });

// // Kullanıcıyı sil
// app.delete('/users/:id', (req, res) => {
//     const index = users.findIndex(u => u.id == req.params.id);
//     if (index === -1) return res.status(404).json({ message: 'User not found' });
//     users.splice(index, 1);
//     res.status(204).send();
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // .env dosyasındaki ortam değişkenlerini al

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());  // JSON gövde verisini almak için

// Swagger JSDoc Konfigürasyonu
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',  // OpenAPI 3.0.0 sürümünü kullanıyoruz
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API Documentation with Swagger',  // API dökümantasyonu açıklaması
        },
        servers: [
            {
                url: 'http://localhost:3000',  // Sunucu URL'si
            },
        ],
    },
    apis: ['./routes/*.js'], // API rotalarının bulunduğu dosyaların yolu
};

// Swagger spesifikasyonu oluştur
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI'yi tanımla
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;  // PORT ortam değişkeninden veya varsayılan olarak 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MK_LocalDB';  // MongoDB bağlantı URI'si

// Rotaları import et
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);  // /users rotasını userRoutes modülüne yönlendir

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);  // /auth rotasını authRoutes modülüne yönlendir

// MongoDB bağlantısını başlat
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Ana sayfa (root) rotası
app.get('/', (req, res) => {
    res.send('MongoDB ile Express API');
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


