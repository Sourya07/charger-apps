import { useEffect, useState } from "react";
import axios from 'axios';


export default function AuthPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleToggle = () => {
        setIsSignup((prev) => !prev);
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const DOMAIN = import.meta.env.VITE_DOMAIN

        const endpoint = isSignup
            ? `${DOMAIN}/auth/v1/signup`
            : `${DOMAIN}/auth/v1/signin`;

        try {
            const res = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "application/json" },
            });

            const data = res.data;
            console.log(data);

            if (!isSignup && data.token) {
                // Save token in localStorage
                localStorage.setItem("jwtToken", data.token);

                // Set axios default Authorization header
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                alert("Signin successful and token saved!");
            } else if (isSignup) {
                alert("Signup successful!");
            } else {
                alert("Signin successful!");
            }

            console.log("Stored token:", localStorage.getItem("jwtToken"));
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Something went wrong");
            } else {
                alert("Error connecting to server");
            }
        }
    };

    // On component mount, load token from localStorage if exists and set it in axios
    // (optional, useful if user refreshes the page and you want axios to have the token)
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isSignup ? "Sign Up" : "Sign In"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        className="text-blue-500 hover:underline"
                        onClick={handleToggle}
                    >
                        {isSignup ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
}