import React, { useState, useEffect } from 'react';
import { BsChatQuoteFill } from "react-icons/bs";
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I assist you today?', isBot: true, timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = { text: input, isBot: false, timestamp: new Date() };
            setMessages([...messages, newMessage]);
            setInput(''); // Clear the input field
            setIsIdle(false);
            setIsTyping(true);

            setTimeout(() => {
                respondToMessage(input);
                setIsTyping(false);
            }, 1000); 
        }
    };

    const respondToMessage = (message) => {
        let response;
        const lowerCaseMessage = message.toLowerCase();
        
        if (lowerCaseMessage.includes('service')) {
            response = 'We offer a range of services including oil changes, brake inspections, engine diagnostics, and more. How can I assist you with our services today?';
        } else if (lowerCaseMessage.includes('warranty')) {
            response = 'Our services come with a warranty period. If the service is unsatisfactory or faulty, we offer a free re-service. How can we help you with your warranty claim?';
        } else if (lowerCaseMessage.includes('booking')) {
            response = 'To book a service, please visit our booking page, select your preferred service, and choose a convenient time slot. How can I assist you with the booking process?';
        } else if (lowerCaseMessage.includes('pricing')) {
            response = 'Our pricing varies based on the service you choose. For example, an oil change starts at $29.99. For more details, please visit our pricing page or ask about a specific service.';
        } else if (lowerCaseMessage.includes('hours')) {
            response = 'Our operating hours are from 9 AM to 6 PM, Monday to Saturday. We are closed on Sundays and public holidays.';
        } else if (lowerCaseMessage.includes('location')) {
            response = 'We are located at 123 Service Lane, QuickCity. You can visit us during our operating hours or book a service online.';
        } else if (lowerCaseMessage.includes('payment')) {
            response = 'We accept various payment methods, including credit/debit cards, PayPal, and cash. Payment is processed securely at the time of booking or after the service is completed.';
        } else if (lowerCaseMessage.includes('emergency service')) {
            response = 'For emergency services, please call our hotline at 0427 245 566-QUICKSERVICE. Our team is available 24/7 to assist with urgent repairs or breakdowns.';
        } else if (lowerCaseMessage.includes('cancel booking')) {
            response = 'To cancel a booking, please visit your account page or contact our customer support team directly. Cancellations must be made at least 24 hours before the scheduled service.';
        } else if (lowerCaseMessage.includes('reschedule booking')) {
            response = 'You can reschedule your booking through our website or by contacting our customer support team. Please note that rescheduling must be done at least 24 hours in advance.';
        } else if (lowerCaseMessage.includes('mechanic')) {
            response = 'Our mechanics are certified professionals with years of experience in vehicle repair and maintenance. How can I assist you with mechanic-related queries?';
        } else if (lowerCaseMessage.includes('maintenance tips')) {
            response = 'Regular maintenance tips: 1) Check tire pressure monthly, 2) Change oil every 5,000 miles, 3) Inspect brakes regularly, 4) Replace air filters every 12,000 miles. Would you like more tips?';
        } else {
            response = 'I am not sure how to help with that. Can you please provide more details? or contact us customer care Ph :  +91 9988776655';
        }
        
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: response, isBot: true, timestamp: new Date() }]);
            setIsIdle(true);
        }, 500);
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        setIsIdle(false);
    };

    const formatTime = (timestamp) => {
        return `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (typingTimeout) clearTimeout(typingTimeout);

        setIsIdle(false);

        setTypingTimeout(setTimeout(() => {
            setIsIdle(true);
        }, 3000)); 
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-wrapper">
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h2 className='brandnameletterNavAd-'>QuickService</h2>
                        <button onClick={toggleChatbot} className="chatbot-close-btn">&times;</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${message.isBot ? 'bot' : 'user'}`}
                            >
                                <span>{message.text}</span>
                                <div className="chatbot-message-meta">{formatTime(message.timestamp)}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chatbot-message bot typing">
                                Typing...
                            </div>
                        )}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}  // Handle Enter key press
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
            {!isOpen && (
                <div className="chatbot-icon" onClick={toggleChatbot}>
                    <BsChatQuoteFill />
                </div>
            )}
        </div>
    );
};

export default Chatbot;
