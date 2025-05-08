import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome 👋</h1>
                <p style={styles.subtitle}>You're now logged in.</p>

                <div style={styles.buttonGroup}>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Logout
                    </button>
                    <button onClick={handleClose} style={styles.secondaryButton}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        backgroundColor: '#f1f3f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif'
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '350px'
    },
    title: {
        marginBottom: '10px',
        fontSize: '28px',
        color: '#333'
    },
    subtitle: {
        fontSize: '16px',
        marginBottom: '30px',
        color: '#666'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
    },
    logoutButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#d32f2f',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px'
    },
    secondaryButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#e0e0e0',
        color: '#333',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '15px'
    }
};

export default Home;
