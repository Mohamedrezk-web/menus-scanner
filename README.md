# 🍽️ Menuz API - Vercel-Powered Backend

## **Transform your menu images into structured JSON objects** with an accuracy ranging from 70% to 99%. Menuz API is a Node.js & Express backend that provides an efficient menu management system with Firebase integration. This API allows you to create, update, and retrieve menu items while ensuring security, performance, and scalability.

## 🚀 Features

✅ **Vercel Deployment** - Leverages Vercel for serverless functions and hosting  
✅ **Firebase Integration** - Uses **Firestore** for database and **Firebase Storage** for image management  
✅ **Rate Limiting** - Protects against brute-force attacks  
✅ **CORS Handling** - Secure cross-origin requests  
✅ **Helmet Security** - Enhances HTTP security headers  
✅ **Error Handling Middleware** - Centralized error management  
✅ **Express Static File Serving** - Serves assets securely

---

## 🏗️ Tech Stack

- **Node.js** (Runtime)
- **Express.js** (Framework)
- **Vercel** (Deployment & Serverless Functions)
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
OPENAI_API_KEY=your-openai-api-key
GOOGLE_VISION_API_KEY=your-google-vision-api-key
PORT=3000
BASE_URL=your-base-url
FIREBASE_SERVICE_ACCOUNT_JSON='{"type": "service_account","project_id": "", "private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": "","universe_domain": ""}'
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

Replace the Firebase configuration with your actual Firebase project credentials.

### 4️⃣ **Firebase Setup**

- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Firestore Database and Storage in your Firebase console
- Set appropriate security rules for both Firestore and Storage
- Generate a service account key from Firebase Project Settings > Service Accounts and use it to populate the `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable

### 5️⃣ **Local Development**

```sh
npm run dev
```

The app will start and run on the specified port (`3000` by default).

### 6️⃣ **Vercel Deployment**

```sh
vercel
```

Make sure to configure the same environment variables in your Vercel project settings.

## 📄 Endpoints

- `GET /health` - Health check
- `GET /api/menu` - Retrieve all menu items
- `POST /api/menu` - Create a new menu item
- `POST /api/upload` - Upload menu images to Firebase Storage

---

## 🔥 Firebase Implementation

### Firestore Collections

- **menus**: Stores menu metadata and structured content

### Storage Buckets

- **/images**: Original menu images

---

## ⚡ Vercel Integration

### Serverless Functions

The API endpoints are deployed as serverless functions on Vercel, providing:

- Automatic scaling
- Zero cold starts with Edge Functions
- Global CDN distribution
- Automatic HTTPS
- CI/CD pipeline integration

### Environment Configuration

Configure the environment variables in your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to Settings > Environment Variables
4. Add all required environment variables

---

## 🛠️ Development

1. **Testing**: Run unit tests using your preferred testing library.
2. **Linting**: Follow ESLint and Prettier configurations for code quality.
3. **Security**: Regularly review security practices using Helmet and Rate Limiting.
4. **Local Development**: Use this command (make sure you have nodmon) local development:
   ```sh
   npm run dev
   ```

---

## 📝 License

This project is licensed under the MIT License.
