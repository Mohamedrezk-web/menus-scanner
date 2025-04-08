# 🍽️ Menuz API - MongoDB-Powered Backend

**Transform your menu images into structured JSON objects** with an accuracy ranging from 70% to 99%. Menuz API is a Node.js & Express backend that provides an efficient menu management system with MongoDB integration. This API allows you to create, update, and retrieve menu items while ensuring security, performance, and scalability.

---

## 🚀 Features

✅ **MongoDB Integration** - Uses **Mongoose** for database interactions  
✅ **Rate Limiting** - Protects against brute-force attacks  
✅ **CORS Handling** - Secure cross-origin requests  
✅ **Helmet Security** - Enhances HTTP security headers  
✅ **Error Handling Middleware** - Centralized error management  
✅ **Express Static File Serving** - Serves assets securely

---

## 🏗️ Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Framework)
- **MongoDB + Mongoose** (Database)
- **Helmet** (Security)
- **Rate Limiter** (API Protection)
- **Dotenv** (Environment Variables)

---

## 🔧 Installation

### 1️⃣ **Clone the repository**

```sh
git clone https://github.com/your-username/Menuz-API.git
cd Menuz-API
```

### 2️⃣ **Install dependencies**

```sh
npm install
```

### 3️⃣ **Set up environment variables**

Create a `.env` file in the root of the project with the following content:

```
PORT=3000
MONGODB_URI=your-mongo-db-connection-string
OPENAI_API_KEY=your-openai-api-key
GOOGLE_VISION_API_KEY=your-google-vision-api-key
```

Replace `your-mongo-db-connection-string` with your MongoDB connection string.

### 4️⃣ **Run the app**

```sh
npm start
```

The app will start and run on the specified port (`3000` by default).

---

## 📄 Endpoints

- `GET /health` - Health check
- `GET /api/menu` - Retrieve all menu items
- `POST /api/menu` - Create a new menu item

---

## 🛠️ Development

1. **Testing**: Run unit tests using your preferred testing library.
2. **Linting**: Follow ESLint and Prettier configurations for code quality.
3. **Security**: Regularly review security practices using Helmet and Rate Limiting.

---

## 📝 License

This project is licensed under the MIT License.
