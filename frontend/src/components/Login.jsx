import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const clickVerifyOtp=()=>{
        navigate("/verifyotp");
    }
    const handleCred = async (e) => {
        e.preventDefault();
        
        const res = await fetch("https://login-page-9.onrender.com/api/auth/login", {
        // const res = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const text = await res.text();
        setMessage(text);

        if (text === "login successfull") {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/Home");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleCred} style={styles.card}>
                <h2 style={styles.title}>Sign in</h2>
                <p style={styles.subtitle}>to continue to your account</p>

                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <div style={styles.forgotPassword}>
    <button type="button" onClick={clickVerifyOtp} style={styles.link}>
        Forgot password?
    </button>
</div>
                {message && <p style={styles.message}>{message}</p>}

                <button type="submit" style={styles.button}>Log In</button>

                <div style={styles.footer}>
                    <span>Don't have an account?</span>
                    <button
                        type="button"
                        style={styles.link}
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </button>
                </div>
                {/* <button onClick={clickVerifyOtp}>forgot password?</button> */}
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
        backgroundColor: '#f2f2f2',
        fontFamily: 'Roboto, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px 30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    title: {
        margin: 0,
        fontSize: '24px',
        fontWeight: 500,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: '14px',
        color: '#5f6368',
        textAlign: 'center'
    },
    input: {
        padding: '12px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '12px',
        backgroundColor: '#1a73e8',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    message: {
        color: 'red',
        fontSize: '13px',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        marginTop: '10px'
    },
    link: {
        background: 'none',
        border: 'none',
        color: '#1a73e8',
        cursor: 'pointer',
        textDecoration: 'underline',
        padding: 0
    }
};

export default Login;
