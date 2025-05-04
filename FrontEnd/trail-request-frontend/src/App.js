import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrailRequestForm from './components/TrailRequestForm';
import SignupForm from './components/SignupForm';
import LoginPage from './components/LoginPage';
import Dashboard from './components/dashboard';
import PaymentCheckout from './components/PaymentCheckout';
import ViewResults from './components/ViewResults';
import AboutUs from './components/AboutUs';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/trail-request" element={<TrailRequestForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/payment" element={<PaymentCheckout />} />
        <Route path="/view-results" element={<ViewResults />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
