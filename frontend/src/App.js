import './App.css';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/sign';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
