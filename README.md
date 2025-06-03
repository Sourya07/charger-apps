# EV Charging Station Backend

This is a backend service for managing EV charging stations. It supports user registration, login (with JWT-based authentication), and CRUD operations for charging stations, ensuring that users can only manage their own stations.

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment configuration

---

## 📁 Project Structure
backend/
│
├── src/
│   ├── db.ts               # Mongoose models for User and Station
│   ├── index.ts            # Entry point for the Express server
│   ├── routes/
│   │   ├── auth.ts         # Routes for signup and signin
│   │   └── station.ts      # Routes for managing stations
│   └── middleware.ts       # JWT middleware for route protection
│
├── package.json
├── tsconfig.json
└── .env                    # Environment variables


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

env file
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
PORT=3000


# 1. Clone the repository
git clone https://github.com/your-username/ev-charging-backend.git
cd ev-charging-backend

# 2. Install dependencies
npm install

# 3. Run the development server
npm run start

# OR use auto-reloading (optional)
npx ts-node-dev src/index.ts

# 4. Build for production
npm run build

# 5. Serve production build
npm run serve

📬 API Endpoints

All authenticated routes require a Bearer <token> in the Authorization header.

🔐 Auth Routes

POST /signup — Register a new user.

🔐 JWT Middleware

All routes under /stations use JWT-based middleware. Pass the token using the Authorization: Bearer <token> header. The middleware attaches userId to the request for access control.

⸻

🧪 Scripts
	•	npm run start – Run using ts-node
	•	npm run build – Compile TypeScript to JavaScript
	•	npm run serve – Run compiled code using Node.js

⸻

📝 License

This project is licensed under the ISC License.
