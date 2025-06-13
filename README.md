<h1 align="center">Flatboard Application ✨</h1>

![Demo App](/frontend/public/home-page.jpg)

<h1 align="center">🛠️ Setup & Running the Solution</h1>

<h3>Prerequisites</h3>
<p>Node.js (v16 or higher)</p>

<h3>1. Install Dependencies</h3>
<p>Run this command in both the <code>frontend</code> and <code>backend</code> directories to install their dependencies:</p>

```bash
npm install
```

<h3>2. Environment Variables</h3>
<p>Create a .env file in the backend root.</p>

### Setup .env file in _backend_ folder

```bash
PORT=5000

MONGO_URI=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

<p>Create a .env file in the frontend root.</p>

### Setup .env file in _frontend_ folder

```bash
VITE_API_URL="http://localhost:5000"
```

<h3>3. Start the Application</h3>
<p>Once environment variables are configured, start both frontend and backend:</p>

```bash
npm run dev
```

<h1>📌 Assumptions</h1>

Node.js are installed and properly configured on the system.

The application requires a .env file with environment variables like MONGODB_URI, PORT, etc.

MongoDB is already running and accessible.

To run both the backend and frontend development servers, you need to execute npm run dev separately in each part of the project.
