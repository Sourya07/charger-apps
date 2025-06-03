import { Routes, Route, BrowserRouter } from "react-router-dom";
import Loginscreen from "./components/loginscreen";
import ChargerListingPage from "./components/charges";
import ChargerMap from "./components/chargermap";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Loginscreen />} />
        <Route path="/station" element={<ChargerListingPage />} />
        <Route path="/map" element={<ChargerMap />} />
      </Routes>
    </BrowserRouter>
  );
}
