import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faTasks, faCalendarAlt, faComments, faCog, faBars,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './MechSide.css';
import { Link } from 'react-router-dom';

const MechanicSidePanel = () => {
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
                <li >
                    <FontAwesomeIcon icon={faTasks} className="panel-icon" />
                    <span>Manage Jobs</span>
                </li>
                <li >
                 <Link to='/Mechmanage' className='no-underline'><FontAwesomeIcon icon={faWrench} className="panel-icon" />
                    <span>Assigned Work</span></Link>
                </li>
                <li >
                    <FontAwesomeIcon icon={faCalendarAlt} className="panel-icon" />
                    <span>Schedule</span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faComments} className="panel-icon" />
                    <span>Feedback</span>
                </li>
                <li >
                    <FontAwesomeIcon icon={faCog} className="panel-icon" />
                    <span>Settings</span>
                </li>
                <li className="logout" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span></li>
            </ul>
            </nav>
            </aside>
        </div>
    );
};

export default MechanicSidePanel;
