import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [optSent, setOtpSent] = useState(false);
    const [btnname, setBtnname] = useState("send otp");
    const [otp, setOtp] = useState('');
    const [verresult, setVerresult] = useState('');
    const [versucc, setVersucc] = useState(false);
    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [resetres, setResetres] = useState('');

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleSendOtp = async () => {
        const res = await fetch("http://localhost:8000/api/auth/sendotp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const text = await res.text();
        if (text === "otp succ sent") {
            setOtpSent(true);
            setBtnname("resend otp");
            setVersucc(false);
            setOtp('');
            setVerresult('');
            setNewpass('');
            setConfirmpass('');
            setResetres('');
        }
        setMessage(text);
    };

    const otpTyped = (e) => {
        e.preventDefault();
        setOtp(e.target.value);
    };

    const handleVerify = async () => {
        const res = await fetch("http://localhost:8000/api/auth/verifyotp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const verres = await res.text();
        setVerresult(verres);
        setVersucc(verres.toLowerCase().includes("verified"));
        if (!verres.toLowerCase().includes("verified")) setOtp('');
    };

    const handlenewpass = (e) => {
        setNewpass(e.target.value);
    };

    const handleconfirmpass = (e) => {
        setConfirmpass(e.target.value);
    };

    const handleReset = async () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{6,}$/;
        const cleanPassword = newpass.trim();
        if (!passwordPattern.test(cleanPassword)) {
            setResetres("Password must contain at least one uppercase letter, one number, and one special character.");
            return;
        }
        if (newpass !== confirmpass) {
            setResetres("passwords do not match");
        } else {
            const res = await fetch("http://localhost:8000/api/auth/resetpass", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newpass })
            });
            const text = await res.text();
            setResetres(text);
        }
    };

    const handleLogin = () => {
        navigate("/");
    };

    // Show blue for success, red for failure
    const getColor = (text) =>
        /success|verified|succ/i.test(text) ? '#1a73e8' : 'red';

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleEmail}
                    style={styles.input}
                />
                <button onClick={handleSendOtp} style={styles.button}>{btnname}</button>
                {message && <p style={{ ...styles.message, color: getColor(message) }}>{message}</p>}

                {optSent && (
                    <>
                        <div style={styles.note}>OTP will expire after 5 minutes</div>
                        <input
                            type="text"
                            value={otp}
                            onChange={otpTyped}
                            placeholder="Enter OTP"
                            style={styles.input}
                        />
                        <button onClick={handleVerify} style={styles.button}>Verify</button>
                        {verresult && <p style={{ ...styles.message, color: getColor(verresult) }}>{verresult}</p>}
                    </>
                )}

                {versucc && (
                    <>
                        <input
                            type="password"
                            value={newpass}
                            onChange={handlenewpass}
                            placeholder="Enter new password"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            value={confirmpass}
                            onChange={handleconfirmpass}
                            placeholder="Confirm new password"
                            style={styles.input}
                        />
                        <button onClick={handleReset} style={styles.button}>Reset Password</button>
                        <button onClick={handleLogin} style={styles.outlineButton}>Back to Login</button>
                        {resetres && <p style={{ ...styles.message, color: getColor(resetres) }}>{resetres}</p>}
                    </>
                )}
            </div>
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
    outlineButton: {
        padding: '12px',
        backgroundColor: '#fff',
        color: '#1a73e8',
        border: '1px solid #1a73e8',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    message: {
        fontSize: '13px',
        textAlign: 'center'
    },
    note: {
        fontSize: '13px',
        color: '#5f6368',
        textAlign: 'center'
    }
};

export default VerifyOtp;
