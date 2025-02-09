import '../assets/css/home.css';
import fog from '../assets/images/fog.png';
import { useState } from "react";
import linkedIn from '../assets/images/LinkedIn.png'
import gitHub from '../assets/images/GitHub.png'
import resume from '../assets/images/resume.png'
import TypingEffect from './TypingEffect';
import myResume from '../assets/images/GadaResume.pdf'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <title>Home</title>
            <section className="hero" id="hero-1" style={{ backgroundImage: `url(${fog})` }}>
                <div className="overlay">
                    <p className='text-2xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl pb-2'>
                        Welcome to my portfolio
                    </p>
                    <div className="text-1xl md:text-3xl sm:text-2xl typing-container">
                        <TypingEffect />
                    </div>
                    <div className='flex my-5'>
                        <a href="https://www.linkedin.com/in/dhrushalg/">
                            <img className='logo' src={linkedIn} alt="Description" />
                        </a>
                        <a href="https://github.com/DhrushalG">
                            <img className='logo' src={gitHub} alt="Description" />
                        </a>
                        <a href="" onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
                            <img className='logo' src={resume} alt="Description" />
                        </a>
                        {/* Modal Overlay */}
                        {isOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                                <div className="relative p-5 rounded-lg shadow-lg max-w-4xl w-full h-[80vh]">
                                    {/* Close Button */}
                                    <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-2xl font-bold pl-3">&times;</button>

                                    {/* Embedded PDF */}
                                    <iframe src={myResume} className="res-modal"></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;