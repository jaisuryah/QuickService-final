import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousal.css'; 

const TestimonialsCarousel = () => {
  return (
    <Carousel
      autoPlay
      interval={5000}
      showStatus={false}
      infiniteLoop
      emulateTouch
      className="custom-carousel" 
    >
      <div className="slide">
        <h1>"Kevin Noel"</h1>
        <p>
        "Amazing service! I took my car for a repair, and I was impressed by the professionalism and efficiency of the team. They not only fixed the issue promptly but also gave great advice on maintenance. Highly recommended!"</p>
      </div>
      <div className="slide">
        <h1>"Scarlett Johnson"</h1>
        <p>
        "I've been using their services for years now, and they never disappoint. From regular maintenance to more complex repairs, they handle everything with expertise. The staff is friendly, and I always leave satisfied with the quality of work."</p>
      </div>
      <div className="slide">
        <h1>"Michael Smith"</h1>
        <p>
        "The best car service in town! I had a major issue with my car, and they handled it exceptionally well. The mechanics are knowledgeable and skillful. I'll definitely be returning for any future car needs."</p>
      </div>
      <div className="slide">
        <h1>"Emiliee Clark"</h1>
        <p>QuickService went above and beyond in fixing my car. Great job!</p>
      </div>
    </Carousel>
  );
};

export default TestimonialsCarousel;
