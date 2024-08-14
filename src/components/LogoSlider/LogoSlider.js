import React, { useEffect, useRef } from 'react';
import './LogoSlider.css';

const LogosSlider = () => {
    const logosContainerRef = useRef(null);

    useEffect(() => {
        const logosContainer = logosContainerRef.current;
        const logosSlide = logosContainer.querySelector('.logos-slide');
        const copy = logosSlide.cloneNode(true);
        logosContainer.appendChild(copy);

        let isDragging = false;
        let startX;
        let scrollLeft;

        const startDragging = (e) => {
            isDragging = true;
            startX = e.pageX - logosContainer.offsetLeft;
            scrollLeft = logosContainer.scrollLeft;
        };

        const stopDragging = () => {
            isDragging = false;
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - logosContainer.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            logosContainer.scrollLeft = scrollLeft - walk;
        };

        logosContainer.addEventListener('mousedown', startDragging);
        logosContainer.addEventListener('mousemove', drag);
        logosContainer.addEventListener('mouseup', stopDragging);
        logosContainer.addEventListener('mouseleave', stopDragging);

        return () => {
            logosContainer.removeEventListener('mousedown', startDragging);
            logosContainer.removeEventListener('mousemove', drag);
            logosContainer.removeEventListener('mouseup', stopDragging);
            logosContainer.removeEventListener('mouseleave', stopDragging);
        };
    }, []);

    return (
        <div className="logos" ref={logosContainerRef}>
            <div className="logos-slide">
                <img src="https://seeklogo.com/images/M/mercedes-benz-logo-B52D36D689-seeklogo.com.png" alt="Placeholder 1" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3yEhrFEMhLynjeNLh668GMfOa3o3C3-QxA&s" alt="Placeholder 2" />
                <img src="https://www.freeiconspng.com/uploads/ford-logo-icon-png-6.png" alt="Placeholder 3" />
                <img src="https://seeklogo.com/images/B/bmw-logo-B2F1DD0D82-seeklogo.com.png" alt="Placeholder 4" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQpFHKEv8oRFOCixaBIMyNLdsgXAKfvGMjA&s" alt="Placeholder 5" />
                <img src="https://iconape.com/wp-content/png_logo_vector/skoda-logo.png" alt="Placeholder 6" />
                <img src="https://www.cybernetik.com/wp-content/uploads/2021/06/TVS-Motor-Company-Ltd.png" alt="Placeholder 7" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2DwKbvkiGxEMtkBXyli4lg0K7pcbbb6drSg&s" alt="Placeholder 8" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY34Q0Fm0kmfWVsvkChS0n4ivPDcj0J98PnA&s" alt="Placeholder 8" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbbDZhyuYmR4m6cCZ3QU38PRPVAKu_9dg9RQ&s" alt="Placeholder 8" />
                <img src="https://gasanzammit.com/wp-content/uploads/2017/04/honda-logo-300x300.png" alt="Placeholder 8" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ya5Ag-alUcc8plU3hb_eG-SbdJijB-hjGA&s" alt="Placeholder 8" />
                <img src="https://i.pinimg.com/originals/c4/21/39/c42139cdd59f7d2b4c6a1df0cb0f59f0.jpg" alt="Placeholder 8" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9VFbWn89M-SP7oWpoj6-0UWY0Z3rWVGTpA&s" alt="Placeholder 8" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJbA2DyNQ5GMhezchRaRgWwBQaPocp4qY_Sg&s" alt="Placeholder 8" />
            </div>
        </div>
    );
};

export default LogosSlider;
