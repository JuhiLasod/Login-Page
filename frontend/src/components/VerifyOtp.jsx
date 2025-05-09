import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [optSent, setOtpSent] = useState(false);
    const [btnname, setBtnname] = useState("Send OTP");
    const [otpArray, setOtpArray] = useState(new Array(6).fill(''));
    const [otp, setOtp] = useState('');
    const [verresult, setVerresult] = useState('');
    const [versucc, setVersucc] = useState(false);
    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [resetres, setResetres] = useState('');
    const otpRefs = useRef([]);

    const handleEmail = (e) => setEmail(e.target.value);

    const handleSendOtp = async () => {
        // const res = await fetch("http://localhost:8000/api/auth/sendotp", {
            const res = await fetch("https://login-page-9.onrender.com/api/auth/sendotp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const text = await res.text();
        if (text === "otp succussefully sent") {
            setOtpSent(true);
            setBtnname("Resend OTP");
            setVersucc(false);
            setOtpArray(new Array(6).fill(''));
            setOtp('');
            setVerresult('');
            setNewpass('');
            setConfirmpass('');
            setResetres('');
        }
        setMessage(text);
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otpArray];
            newOtp[index] = value;
            setOtpArray(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
            setOtp(newOtp.join(''));
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpArray[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        // const res = await fetch("http://localhost:8000/api/auth/verifyotp", {
        const res = await fetch("https://login-page-9.onrender.com/api/auth/verifyotp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const verres = await res.text();
        setVerresult(verres);
        setVersucc(verres === "otp verified successfully");
        if (verres !== "otp verified successfully") {
            setOtpArray(new Array(6).fill(''));
            setOtp('');
        }
    };

    const handlenewpass = (e) => setNewpass(e.target.value);
    const handleconfirmpass = (e) => setConfirmpass(e.target.value);

    const handleReset = async () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{6,}$/;
        const cleanPassword = newpass.trim();
        if (!passwordPattern.test(cleanPassword)) {
            setResetres("Password must contain at least one uppercase letter, one number, and one special character.");
            return;
        }
        if (newpass !== confirmpass) {
            setResetres("Passwords do not match");
        } else {
            // const res = await fetch("http://localhost:8000/api/auth/resetpass", {
                const res = await fetch("https://login-page-9.onrender.com/api/auth/resetpass", {
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

    const getColor = (text) =>
        (text.toLowerCase().includes("success") || text.toLowerCase().includes("successfull") || text.toLowerCase().includes("verified") || text.toLowerCase().includes("succ"))
            ? '#1a73e8' : 'red';

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
                        <div style={styles.note}>OTP will expire after 5 min</div>
                        <div style={styles.otpContainer}>
                            {otpArray.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                    maxLength="1"
                                    value={digit}
                                    ref={el => otpRefs.current[index] = el}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                    onFocus={(e) => e.target.select()}
                                    style={styles.otpBox}
                                />
                            ))}
                        </div>
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
                        
                        {resetres && <p style={{ ...styles.message, color: getColor(resetres) }}>{resetres}</p>}
                    </>
                )}<button onClick={handleLogin} style={styles.outlineButton}>Back to Login</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        fontFamily: 'Roboto, sans-serif',
        padding: '10px',
        overflow: 'hidden', // prevents scrollbars
        boxSizing: 'border-box'
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
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
    },
    otpContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        gap: '5px'
    },
    otpBox: {
        width: '50px',
        height: '50px',
        fontSize: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        transition: 'border-color 0.3s',
    }
};

export default VerifyOtp;
