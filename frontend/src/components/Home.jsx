import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                fontFamily: 'Segoe UI, sans-serif',
                textAlign: 'center',
                padding: '20px'
            }}
        >
            <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Welcome to the Home Page
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
                Choose an option below to continue
            </p>
            <div>
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        padding: '12px 30px',
                        margin: '10px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={e => (e.target.style.backgroundColor = '#45a049')}
                    onMouseOut={e => (e.target.style.backgroundColor = '#4CAF50')}
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    style={{
                        padding: '12px 30px',
                        margin: '10px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#2196F3',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={e => (e.target.style.backgroundColor = '#1976D2')}
                    onMouseOut={e => (e.target.style.backgroundColor = '#2196F3')}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Home;