import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import MainPage from './mainpage';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username,setUsername ] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/mainpage" element={loggedIn ? <MainPage /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
