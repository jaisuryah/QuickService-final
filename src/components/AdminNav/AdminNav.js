import React, { useState, useEffect } from 'react';
import './AdminNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faWrench, faUserCog, faComments, faSignOutAlt, faBars, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminSidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsOpen(true); 
    }
  };

  const handleClickOutside = (event) => {
    if (isMobile && event.target.closest('.admin-side-panel') === null && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  return (
    <div className="admin-container">
      <button className={`hamburger-1 ${isOpen ? 'hidden' : ''}`} onClick={toggleSidePanel}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <aside className={`admin-side-panel ${isOpen ? 'open' : 'closed'}`}>
        <h2 className='brandnameletterNavAd'>QuickService</h2>
        <nav className="side-panel-nav">
          <ul>
            <Link to="/Admin" className="no-underline"><li><FontAwesomeIcon icon={faHome} /><span>Home</span></li></Link>
            <Link to="/AdminCus" className="no-underline"><li><FontAwesomeIcon icon={faUsers} /><span>Manage Customers</span></li></Link>
            <Link to="/AdminSer" className="no-underline"><li><FontAwesomeIcon icon={faWrench} /><span>Manage Services</span></li></Link>
            <Link to="/AdminMech" className="no-underline"><li><FontAwesomeIcon icon={faUserCog} /><span>Manage Mechanics</span></li></Link>
            <Link to="/AdminBook" className="no-underline"><li><FontAwesomeIcon icon={faCalendarAlt} /><span>Manage Bookings</span></li></Link>
            <Link to="/AdminFeed" className="no-underline"><li><FontAwesomeIcon icon={faComments} /><span>Feedbacks</span></li></Link>
            <li className="logout" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AdminSidePanel;
