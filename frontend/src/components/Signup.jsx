import React, { useState } from "react";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleNewAcc = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const text = await res.text();
            setMessage(text);
        } catch (error) {
            setMessage("Failed to connect to server.");
        }
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', sans-serif",
    };

    const cardStyle = {
        background: "rgba(255, 255, 255, 0.92)",
        padding: "2rem 3rem",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        width: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        textAlign: "center"
    };

    const inputStyle = {
        padding: "0.75rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1rem"
    };

    const buttonStyle = {
        padding: "0.75rem",
        backgroundColor: "#0077ff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    };

    const messageStyle = {
        fontWeight: "bold",
        color: "#555",
        marginTop: "0.5rem"
    };

    return (
        <div style={containerStyle}>
            <form style={cardStyle} onSubmit={handleNewAcc}>
                <h2 style={{ marginBottom: "1rem", color: "#333" }}>Create Account</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#005dc1"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#0077ff"}
                >
                    Sign Up
                </button>
                <p style={messageStyle}>{message}</p>
            </form>
        </div>
    );
}

export default Signup;
