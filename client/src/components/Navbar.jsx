import { useState } from 'react';
import '../assets/css/navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={`navbar flex items-center rounded-lg justify-between p-5 `}>
            <p className="text-xl lg:text-2xl md:text-xl sm:text-xl font-bold hover:text-purple-700"><a href="#home">Dhrushal Gada</a></p>

            {/* Full Navbar for larger screens */}
            <div className="text-xl hidden md:block absolute left-1/2 transform -translate-x-1/2 ">
                <a href="#home" className="hover:text-purple-700">Home</a>
                <a href="#about" className="hover:text-purple-700 mx-5">About</a>
                <a href="#skills" className="hover:text-purple-700">Skills</a>
                <a href="#projects" className="hover:text-purple-700 ml-5">Projects</a>
            </div>

            {/* Dark Mode larger screens */}
            <div className="md:block hidden space-x-2">
                {/* <p>Dark Mode</p> */}
                <label htmlFor="darkModeToggle" className="switch">
                    <input id="darkModeToggle" type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <span className="slider round"></span>
                </label>
            </div>

            {/* Dark Mode smaller screens */}
            <div className='md:hidden flex space-x-4'>
                <div className="space-x-2">
                    {/* <p>Dark Mode</p> */}
                    <label htmlFor="darkModeToggle" className="switch">
                        <input id="darkModeToggle" type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                {/* Hamburger icon for mobile */}
                <div className="p-1" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`w-6 h-1 ${darkMode ? 'bg-white' : 'bg-black'} transition-colors`}></div>
                    <div className={`w-6 h-1 my-1 ${darkMode ? 'bg-white' : 'bg-black'} transition-colors`}></div>
                    <div className={`w-6 h-1 ${darkMode ? 'bg-white' : 'bg-black'} transition-colors`}></div>
                </div>

                {/* Dropdown menu for mobile */}
                <nav className={` ${menuOpen ? 'block' : 'hidden'} navdrop md:hidden`}>
                    <a href="#home" className="block px-4 py-2 hover:text-purple-700">Home</a>
                    <a href="#about" className="block px-4 py-2 hover:text-purple-700">About</a>
                    <a href="#skills" className="block px-4 py-2 hover:text-purple-700">Skills</a>
                    <a href="#projects" className="block px-4 py-2 hover:text-purple-700">Projects</a>
                </nav>
            </div>
            
        </nav>
    );
};

export default Navbar;



