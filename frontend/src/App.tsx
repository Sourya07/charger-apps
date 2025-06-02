// App.tsx
import { Routes, Route } from "react-router-dom";
import Loginscreen from "./components/loginscreen";
import { BrowserRouter } from "react-router-dom";
import ChargerListingPage from "./components/charges";
import ChargerMap from "./components/chargermap";

export default function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>

          <Route path="/signup" element={<Loginscreen />} />
          <Route path="/station" element={<ChargerListingPage />} />
          <Route path="/map" element={<ChargerMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}