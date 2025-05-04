import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/WhatsApp Image 2025-02-17 at 14.29.29_59743a97 1.png';
import user from '../assets/bigstock-323788516-1024x614 2.png';
import mainImg from '../assets/image 1.png';
import calendar from '../assets/9_Pragmatica_3D_Metal_Calendar.png';
import card1 from '../assets/image 2.png';
import card2 from '../assets/image 4.png';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="Dashboard">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="brand-name">AUTOVANCE</span>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/trail-request')}>REQUEST TRAIL DATE</button>
          <button onClick={() => navigate('/confirmation')}>CONFIRMATION</button>
          <button onClick={() => navigate('/payment')}>PAYMENT CHECKOUT</button>
          <button onClick={() => navigate('/view-results')}>VIEW RESULTS</button>
          <button onClick={() => navigate('/about-us')}>ABOUT US</button>
        </div>
        <div className="user-profile">
          <img src={user} alt="User" className="user-img" />
          <span>P. Harigaran</span>
        </div>
      </nav>

      <main className="content">
        <div className="top-section">
          <img src={mainImg} alt="Main" className="main-img" />
          <div className="calendar-box">
            <span>Upcoming QBR</span>
            <img src={calendar} alt="Calendar" className="calendar-img" />
            <p>12th Aug, 2022</p>
          </div>
        </div>
        <div className="bottom-section">
          <img src={card1} alt="Card 1" className="bottom-img" />
          <img src={card2} alt="Card 2" className="bottom-img" />
          <div className="bottom-img label-box">
            <img src={card2} alt="Card 2" />
            <p>DRIVING SCHOOL</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
