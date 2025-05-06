import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
// import UploadProducts from './pages/UploadProducts';
// import SetPricing from './pages/SetPricing';
// import MLDashboard from './pages/MLDashboard';
// import Simulator from './pages/Simulator';
// import Profile from './pages/Profile';

const App = () => {
  return (
    <div> <AuthProvider>
    <Router>
     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={ <Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  </AuthProvider>
    </div>
  );
};

export default App;
