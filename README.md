# 🍽️ Menuz API - Firebase-Powered Backend

## **Transform your menu images into structured JSON objects** with an accuracy ranging from 70% to 99%. Menuz API is a Node.js & Express backend that provides an efficient menu management system with Firebase integration. This API allows you to create, update, and retrieve menu items while ensuring security, performance, and scalability.

## 🚀 Features

✅ **Firebase Integration** - Uses **Firestore** for database interactions and **Firebase Storage** for image management  
✅ **Rate Limiting** - Protects against brute-force attacks  
✅ **CORS Handling** - Secure cross-origin requests  
✅ **Helmet Security** - Enhances HTTP security headers  
✅ **Error Handling Middleware** - Centralized error management  
✅ **Express Static File Serving** - Serves assets securely

---

## 🏗️ Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Framework)
- **Firebase Firestore** (NoSQL Database)
- **Firebase Storage** (File Storage)
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
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
OPENAI_API_KEY=your-openai-api-key
GOOGLE_VISION_API_KEY=your-google-vision-api-key
```

Replace the Firebase configuration with your actual Firebase project credentials.

### 4️⃣ **Firebase Setup**

- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Firestore Database and Storage in your Firebase console
- Set appropriate security rules for both Firestore and Storage

### 5️⃣ **Run the app**

```sh
npm start
```

## The app will start and run on the specified port (`3000` by default).

## 📄 Endpoints

- `GET /health` - Health check
- `GET /api/menu` - Retrieve all menu items
- `POST /api/menu` - Create a new menu item
- `POST /api/upload` - Upload menu images to Firebase Storage

---

## 🔥 Firebase Implementation

### Firestore Collections

- **menus**: Stores menu metadata and structured content
- **users**: User authentication and preferences
- **analytics**: Usage statistics and tracking

### Storage Buckets

- **/menu-images**: Original menu images
- **/processed-images**: Post-processing images with annotations

---

## 🛠️ Development

1. **Testing**: Run unit tests using your preferred testing library.
2. **Linting**: Follow ESLint and Prettier configurations for code quality.
3. **Security**: Regularly review security practices using Helmet and Rate Limiting.
4. **Firebase Emulators**: Use local Firebase emulators for development:
   ```sh
   firebase emulators:start
   ```

---

## 📝 License

This project is licensed under the MIT License.
