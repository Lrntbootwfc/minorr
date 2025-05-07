import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext';
// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
// import UploadProducts from './pages/UploadProducts';
// import SetPricing from './pages/SetPricing';
import MLDashboard from './pages/MLDashboard';
// import Simulator from './pages/Simulator';
// import Profile from './pages/Profile';

const App = () => {
  return (
    <>  <Router>
      <UserProvider>
  
     
     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={ <Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ml-dashboard" element={<MLDashboard />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    
      
    </UserProvider>
    </Router>
    </>
  );
};

export default App;
