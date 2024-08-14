import React from 'react';
import { FaCalendarCheck, FaCar, FaTools, FaCheckCircle, FaHome, FaStar,FaThumbsUp } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './How.css';
import Navbar from '../Navbar/Navbar';
import Chatbot from '../ChatBot/Chatbot';

const How = () => {
  return (
    <div>
    <Chatbot/>
      <Navbar />
      <div className='timeline'>
        <VerticalTimeline className='container'>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: '7px solid rgb(255, 255, 255)' }}
            date="Booking Request"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<FaCalendarCheck />}
          >
            <h3 className="vertical-timeline-element-title">Service Booking Requested</h3>
            <h4 className="vertical-timeline-element-subtitle">Customer</h4>
            <p>
              A customer requests a vehicle service through the online platform.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Booking Confirmation"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaCar />}
          >
            <h3 className="vertical-timeline-element-title">Booking Confirmation</h3>
            <h4 className="vertical-timeline-element-subtitle">Service Center</h4>
            <p>
              The service center confirms the booking and schedules the service.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Vehicle Pick-Up"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaHome />}
          >
            <h3 className="vertical-timeline-element-title">Vehicle Pick-Up</h3>
            <h4 className="vertical-timeline-element-subtitle">Customer</h4>
            <p>
              The service staff picks up the vehicle at the customer's residence.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Service in Progress"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaTools />}
          >
            <h3 className="vertical-timeline-element-title">Service in Progress</h3>
            <h4 className="vertical-timeline-element-subtitle">Service Center</h4>
            <p>
              The service center performs the requested vehicle service.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Service Completion"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaCheckCircle />}
          >
            <h3 className="vertical-timeline-element-title">Service Completion</h3>
            <h4 className="vertical-timeline-element-subtitle">Service Center</h4>
            <p>
              The service center completes the vehicle service and informs the customer.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Vehicle Delivery"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaHome />}
          >
            <h3 className="vertical-timeline-element-title">Vehicle Delivery</h3>
            <h4 className="vertical-timeline-element-subtitle">Service Staff</h4>
            <p>
              The service staff picks up the serviced vehicle from the service center and delivers it to the customer.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="Customer Feedback"
            iconStyle={{ background: 'black', color: '#fff' }}
            icon={<FaStar />}
          >
            <h3 className="vertical-timeline-element-title">Customer Feedback</h3>
            <h4 className="vertical-timeline-element-subtitle">Customer</h4>
            <p>
              The customer provides feedback on the service experience.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            icon={<FaThumbsUp/>}
          />
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default How;
