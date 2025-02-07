// import { useEffect, useState } from 'react';
import '../assets/css/footer.css';
// import plant1 from '../images/plant-svg1.svg';
// import plant2 from '../images/plant-svg2.svg';
// import plant3 from '../images/plant-svg3.svg';

const Footer = () => {
    // const [currentStage, setCurrentStage] = useState(0); // Start from 0, so the first image in plantImages will be used
    // const stages = [0.6, 0.8, 1]; // Make sure to match the stages of growth with the images

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentStage((prev) => (prev < 2 ? prev + 1 : 2)); // Transition to the next stage every 2 seconds
    //     }, 2000); // Change every 2 seconds

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <footer>
            <div className='footer-line' />
            <div className="footer-container">
                {/* Left Column */}
                <div>
                    <h3 className="text-2xl font-semibold">Dhrushal Gada</h3>
                    <p className="mt-2">Passionate web developer with expertise in front-end and back-end technologies.</p>
                    <div className="mt-4">
                        <a href="https://linkedin.com/in/dhrushalgada" className="text-blue-400 hover:text-blue-600">LinkedIn</a> | 
                        <a href="mailto:your.email@example.com" className="text-blue-400 hover:text-blue-600"> Email</a>
                    </div>
                </div>

                {/* Right Column */}
                <div className="text-center md:text-right">
                    <h3 className="text-2xl font-semibold">Navigation</h3>
                    <ul className="mt-4">
                        <li><a href="#about" className="block text-gray-300 hover:text-blue-400 py-1">About</a></li>
                        <li><a href="#skills" className="block text-gray-300 hover:text-blue-400 py-1">Skills</a></li>
                        <li><a href="#projects" className="block text-gray-300 hover:text-blue-400 py-1">Projects</a></li>
                        <li><a href="#contact" className="block text-gray-300 hover:text-blue-400 py-1">Contact</a></li>
                    </ul>
                </div>
            </div>

            {/* Plant Animation in the Background */}
            {/* <img 
                src={plant} 
                alt="Growing Plant" 
                className={`plant plant-background stage-${currentStage + 1}`} // Adjust the stage
                style={{
                    transform: `scale(${stages[currentStage]})`, // Apply the growing effect
                    opacity: stages[currentStage], // Make the plant more visible as it grows
                }}
            /> */}

            {/* Copyright */}
            <div className="text-center mt-6 text-sm">
                <p>&copy; 2025 Dhrushal Gada. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;

