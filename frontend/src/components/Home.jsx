import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home(){
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate("/login");
    }
    const handleSignup=()=>{
        navigate("/signup");
    }
    return (
        <div>
            <h1>i am home page</h1>
            <button onClick={handleLogin}>login</button>
            <br/>
            <button onClick={handleSignup}>sign up</button>
        </div>
    );
}
export default Home;