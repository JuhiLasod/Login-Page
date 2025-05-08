import './App.css';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/sign';
import ProtectedRoutes from './components/ProtectedRoutes';
import VerifyOtp from './components/VerifyOtp';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verifyotp" element={<VerifyOtp />}/>
      </Routes>
    </div>
  );
}

export default App;
