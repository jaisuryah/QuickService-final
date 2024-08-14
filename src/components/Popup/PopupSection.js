import React, { useState } from 'react';
import { FaPhone, FaTruck } from 'react-icons/fa';
import './PopupSection.css'; 

const PopupSection = () => {
    const [visible, setVisible] = useState(true);

    const closePopup = () => {
        setVisible(false);
    };

    return (
        visible && (
            <div className="popup-section">
                <span className="popup-close" onClick={closePopup}>&times;</span>
                <FaTruck className="popup-icon" />
                <span className="popup-message">For 24/7 Roadside Assistance, contact us</span>
                <FaPhone className="popup-icon" />
            </div>
        )
    );
};

export default PopupSection;
