# ⚡ EV Charging Station Frontend

This is the frontend for the EV Charging Station Management App. Built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router**, it provides a user-friendly UI for authentication and managing EV charging stations.

---

## 🚀 Tech Stack

- **React 19** with **TypeScript**
- **Vite** for blazing fast dev/build
- **Tailwind CSS** for utility-first styling
- **Axios** for HTTP requests
- **React Router DOM v7** for routing
- **@react-google-maps/api** for map integration

---

## 📁 Project Structure
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level views (Home, Login, etc.)
│   ├── routes/              # Route configuration
│   ├── App.tsx              # Main app entry
│   ├── main.tsx             # Vite + React DOM mounting
│   └── styles/              # Tailwind & global styles
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config




---

## 📦 Installation & Setup

### 1. Clone the Repo


git clone https://github.com/your-username/ev-charging-frontend.git
cd ev-charging-frontend
2. Install Dependencies
npm install

3. Start Development Server
   npm run dev
Open http://localhost:5173 to view it in the browser.

🔍 Scripts

Command
Description
npm run dev
Start Vite dev server
npm run build
Build for production (Vite + TS)
npm run preview
Preview built app
npm run lint
Lint project using ESLint

🌐 Features
	•	✅ JWT-based Auth (Login / Signup)
	•	✅ Charging Station List + Filters
	•	✅ Add / Edit / Delete Stations
	•	✅ Google Maps Integration
	•	✅ Tailwind Responsive UI

⚙️ Environment Variables

Create a .env file in the root with
VITE_API_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

📝 License

This project is licensed under the MIT License.

⸻

📫 Contact

Feel free to reach out via GitHub if you have questions or feedback.












# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
