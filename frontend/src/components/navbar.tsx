// components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const navStyle = (path: string) =>
        `px-4 py-2 rounded-md transition ${location.pathname === path
            ? "bg-white text-black"
            : "text-white hover:bg-gray-700"
        }`;

    return (
        <nav className="bg-black shadow p-4 flex justify-between items-center">
            {/* Website Name on the Left */}
            <div className="text-white text-xl font-bold">
                EVCharge
            </div>

            {/* Navigation Links on the Right */}
            <div className="flex space-x-4">
                <Link to="/" className={navStyle("/")}>Login</Link>
                <Link to="/station" className={navStyle("/station")}>Stations</Link>
                <Link to="/map" className={navStyle("/map")}>Map</Link>
            </div>
        </nav>
    );
}
