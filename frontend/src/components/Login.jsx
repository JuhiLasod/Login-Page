import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleCred = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const text = await res.text();
        setMessage(text);
    };

    return (
        <div style={styles.background}>
            <form onSubmit={handleCred} style={styles.card}>
                <h2 style={styles.title}>Login</h2>

                <label style={styles.label}>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Login</button>
                <p style={styles.message}>{message}</p>
            </form>
        </div>
    );
}

const styles = {
    background: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        width: '300px',
        textAlign: 'center'
    },
    title: {
        marginBottom: '20px',
        color: '#333'
    },
    label: {
        display: 'block',
        textAlign: 'left',
        margin: '10px 0 5px',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    message: {
        marginTop: '15px',
        color: '#d32f2f',
        fontWeight: 'bold'
    }
};

export default Login;