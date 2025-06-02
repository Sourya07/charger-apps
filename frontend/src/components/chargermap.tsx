import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from 'axios';// your axios instance with interceptor

type Station = {
    _id: number;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    status: 'Active' | 'Inactive';
    powerOutput: number;
    connectorType: string;
};

const containerStyle = {
    width: "100%",
    height: "90vh",
};

const center = {
    lat: 20.5937, // Default to India center
    lng: 78.9629,
};

console.log("hihi")


// replace with your key

export default function ChargerMap() {
    const [chargers, setChargers] = useState<Station[]>([]);
    const [selectedCharger, setSelectedCharger] = useState<Station | null>(null);

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


    console.log(GOOGLE_MAPS_API_KEY)
    console.log("hihi")

    const token = localStorage.getItem("jwtToken")

    console.log(token)

    useEffect(() => {
        const fetchChargers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/charges",
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                setChargers(res.data);
                console.log(res.data)
            } catch (err) {
                console.error("Failed to load chargers:", err);
            }
        };

        fetchChargers();
    }, []);

    console.log(chargers)

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY!}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
                {chargers.map((charger) => (
                    <Marker
                        key={charger._id}
                        position={{ lat: charger.location.latitude, lng: charger.location.longitude }}
                        onClick={() => setSelectedCharger(charger)}
                    />
                ))}

                {selectedCharger && (
                    <InfoWindow
                        position={{
                            lat: selectedCharger.location.latitude,
                            lng: selectedCharger.location.longitude,
                        }}
                        onCloseClick={() => setSelectedCharger(null)}
                    >
                        <div>
                            <h3 className="font-bold">{selectedCharger.name}</h3>
                            <p>{selectedCharger.powerOutput}</p>
                            <p>{selectedCharger.connectorType}</p>
                            <p>{selectedCharger.status}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}