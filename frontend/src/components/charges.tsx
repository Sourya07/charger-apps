import { useEffect, useState } from 'react';
import axios from 'axios';

// Define Station type
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

type Filter = {
    status: string;
    powerOutput: string;
    connectorType: string;
};

type FormState = {
    name: string;
    latitude: string;
    longitude: string;
    status: 'Active' | 'Inactive';
    powerOutput: string;
    connectorType: string;
    _id: number | null;
};

export default function ChargerListingPage() {
    const [stations, setStations] = useState<Station[]>([]);
    const [filters, setFilters] = useState<Filter>({ status: '', powerOutput: '', connectorType: '' });
    const [form, setForm] = useState<FormState>({
        name: '',
        latitude: '',
        longitude: '',
        status: 'Active',
        powerOutput: '',
        connectorType: '',
        _id: null,
    });

    useEffect(() => {
        fetchStations();
    }, []);

    const token = localStorage.getItem("jwtToken")

    const fetchStations = async () => {
        const res = await axios.get('http://localhost:3000/charges/',
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

        setStations(res.data);
        console.log(res)
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3000/charges/Create/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        fetchStations();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const stationData = {
            name: form.name,
            location: {
                latitude: parseFloat(form.latitude),
                longitude: parseFloat(form.longitude),
            },
            status: form.status,
            powerOutput: parseFloat(form.powerOutput),
            connectorType: form.connectorType,
        };

        if (form._id !== null) {
            await axios.put(`http://localhost:3000/charges/${form._id}`, stationData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
        } else {
            await axios.post('http://localhost:3000/charges/Create', stationData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
        }

        setForm({
            name: '',
            latitude: '',
            longitude: '',
            status: 'Active',
            powerOutput: '',
            connectorType: '',
            _id: null,
        });

        fetchStations();
    };

    const filteredStations = stations.filter((s) => {
        return (
            (!filters.status || s.status === filters.status) &&
            (!filters.powerOutput || s.powerOutput === parseFloat(filters.powerOutput)) &&
            (!filters.connectorType || s.connectorType === filters.connectorType)
        );
    });

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Charger Stations</h1>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="p-2 border rounded">
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <input
                    type="number"
                    placeholder="Power Output"
                    onChange={(e) => setFilters({ ...filters, powerOutput: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Connector Type"
                    onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })}
                    className="p-2 border rounded"
                />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <input
                    required
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    required
                    type="text"
                    placeholder="Connector Type"
                    value={form.connectorType}
                    onChange={(e) => setForm({ ...form, connectorType: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    required
                    type="number"
                    placeholder="Power Output"
                    value={form.powerOutput}
                    onChange={(e) => setForm({ ...form, powerOutput: e.target.value })}
                    className="p-2 border rounded"
                />
                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'Active' | 'Inactive' })}
                    className="p-2 border rounded"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <input
                    required
                    type="number"
                    placeholder="Latitude"
                    value={form.latitude}
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    required
                    type="number"
                    placeholder="Longitude"
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    className="p-2 border rounded"
                />
                <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
                    {form._id !== null ? 'Update' : 'Add'} Station
                </button>
            </form>

            {/* Listing */}
            <div className="space-y-4">
                {filteredStations.map((station) => (
                    <div key={station._id} className="border rounded p-4 shadow flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">{station.name}</h2>
                            <p>Status: {station.status}</p>
                            <p>Power: {station.powerOutput} kW</p>
                            <p>Connector: {station.connectorType}</p>
                            <p>
                                Lat: {station.location.latitude}, Long: {station.location.longitude}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() =>
                                    setForm({
                                        name: station.name,
                                        latitude: station.location.latitude.toString(),
                                        longitude: station.location.longitude.toString(),
                                        status: station.status,
                                        powerOutput: station.powerOutput.toString(),
                                        connectorType: station.connectorType,
                                        _id: station._id,
                                    })
                                }
                                className="bg-yellow-400 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(station._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}