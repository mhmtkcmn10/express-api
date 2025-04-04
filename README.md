# Express API with MongoDB & Swagger

Bu proje, Express.js ile oluşturulmuş bir API'yi MongoDB veritabanı ile entegre eder ve Swagger UI kullanarak API dökümantasyonunu sağlar.

## Özellikler
- **Express.js**: API'nin temel framework'ü.
- **MongoDB**: Veritabanı olarak MongoDB kullanılır.
- **Swagger UI**: API'yi görsel olarak dökümante eder ve test edilmesini sağlar.
- **JWT Authentication**: Kullanıcı kimlik doğrulaması için JSON Web Token (JWT) kullanılır.

## Kurulum

Bu projeyi yerel ortamınıza kurmak için aşağıdaki adımları izleyebilirsiniz.

### Repository'i Klonlayın

Öncelikle bu repository'yi bilgisayarınıza klonlayın:
```bash
git clone https://github.com/mhmtkcmn10/express-api.git
cd express-api

#### Gerekli Bağımlılıkları Yükleyin

npm install

#### .env Dosyasını Oluşturun

MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret

#### Uygulamayı başlatma

npm start

#### Swagger UI'yi Görüntüleyin

http://localhost:3000/api-docs
