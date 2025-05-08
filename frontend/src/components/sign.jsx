import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        navigate("/");
    };

    const handleNewAcc = async (e) => {
        e.preventDefault();
        try {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(username)) {
                setMessage("Please enter a valid email address.");
                return;
            }
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/;
            const cleanPassword = password.trim();
            console.log(cleanPassword);
            if (!passwordPattern.test(cleanPassword)) {
                setMessage("Password must contain at least one uppercase letter, one number, and one special character.");
                return;
            }
            else {
                console.log("Regex passed!");
            }

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

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleNewAcc}>
                <h2 style={styles.title}>Create your account</h2>

                <input
                    type="email"
                    placeholder="Email "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                {message && <p style={styles.message}>{message}</p>}

                <button type="submit" style={styles.primaryButton}>
                    Sign Up
                </button>

                <button type="button" onClick={handleClose} style={styles.secondaryButton}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f3f4',
        fontFamily: 'Roboto, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    title: {
        margin: 0,
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: 500,
        textAlign: 'center'
    },
    input: {
        padding: '12px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    primaryButton: {
        padding: '12px',
        backgroundColor: '#1a73e8',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    secondaryButton: {
        padding: '10px',
        backgroundColor: '#f5f5f5',
        color: '#444',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    message: {
        fontSize: '13px',
        color: 'red',
        textAlign: 'center'
    }
};

export default Signup;
