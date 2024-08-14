import React, { useEffect, useState } from 'react';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faUserCog, faWrench, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import AdminSidePanel from '../AdminNav/AdminNav';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);
const pieData = {
  labels: ['Booked Services', 'Customers', 'Mechanics'],
  datasets: [
    {
      data: [300, 50, 100], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 4,
    },
  ],
};


const barData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Bookings',
      data: [12, 19, 3, 5, 2, 3, 9], 
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Service Requests',
      data: [30, 50, 45, 60, 70, 90, 120],
      borderColor: '#FF5733',
      backgroundColor: 'rgba(255, 87, 51, 0.2)',
      fill: true,
    },
  ],
};

const trends = [
  "Increase in emergency roadside assistance requests.",
  "Growth in bookings for regular vehicle maintenance.",
  "Rise in demand for at-home car servicing.",
  "More customers opting for eco-friendly service options.",
  "Surge in bookings through mobile app."
];

const AdminDashboard = () => {
  const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [helpVisible, setHelpVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendIndex(prevIndex => (prevIndex + 1) % trends.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <center><h1 style={{ marginTop: '20px' }}>Admin Panel</h1></center>
      <div className={`dashboard-container ${!sidePanelOpen ? 'side-panel-closed' : ''}`}>
        <AdminSidePanel toggleSidePanel={() => setSidePanelOpen(prev => !prev)} />
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faCar} className="dashboard-icon" />
          <h3>Currently Booked Services</h3>
          <p>300</p>
          <p>Booked this week: 70</p>
        </div>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faUsers} className="dashboard-icon" />
          <h3>Customers</h3>
          <p>50</p>
          <p>New customers this month: 10</p>
        </div>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faUserCog} className="dashboard-icon" />
          <h3>Mechanics</h3>
          <p>100</p>
          <p>Active mechanics: 90</p>
        </div>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faWrench} className="dashboard-icon" />
          <h3>Active Services</h3>
          <p>75</p>
          <p>Services added this week: 10</p>
        </div>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faCalendarCheck} className="dashboard-icon" />
          <h3>Upcoming Appointments</h3>
          <p>30</p>
          <p>Appointments scheduled for today: 5</p>
        </div>
        <div className="chart-container">
          <Pie data={pieData} className="pie-chart" options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}` } } } }} />
        </div>
        <div className="chart-container">
          <Bar data={barData} className="bar-chart" options={{ responsive: true, plugins: { legend: { display: true }, tooltip: { callbacks: { label: (tooltipItem) => `Day: ${tooltipItem.label}, Bookings: ${tooltipItem.raw}` } } } }} />
        </div>
        <br/>
        <div className="chart-container-2">
          <Line data={lineData} className="line-chart" options={{ responsive: true, plugins: { legend: { display: true }, tooltip: { callbacks: { label: (tooltipItem) => `Month: ${tooltipItem.label}, Requests: ${tooltipItem.raw}` } } } }} />
        </div>
        <div className="trends-container">
          <h2>Current Trends</h2>
          <hr className="section-divider" />
          <div className="slideshow">
            {trends.map((trend, index) => (
              <div
                key={index}
                className={`trend-item ${index === currentTrendIndex ? 'active' : ''}`}
              >
                {trend}
              </div>
            ))}
          </div>
        </div>
        {helpVisible && <HelpSection onClose={() => setHelpVisible(false)} />}
      </div>
    </div>
  );
};

const HelpSection = ({ onClose }) => (
  <div className="help-section" onClick={onClose}>
    <h3>Need Assistance?</h3>
    <p>If you need help, please contact our support team.</p>
    <p>Email: support@example.com</p>
    <p>Phone: +123-456-7890</p>
  </div>
);

export default AdminDashboard;
