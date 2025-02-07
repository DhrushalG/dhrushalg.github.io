import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
// eslint-disable-next-line 
import Skills from './components/Skills';
import Projects from './components/Projects';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);
  return (
    <div className={darkMode ? 'bg-dark-gray text-white' : 'bg-gray-100 text-black'}>
      {/* Set the head content */}
      <head>
        <meta charSet="utf-8" />
        <title>My React App</title>
        {/* <link rel="icon" href={logo} /> */}
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

        <meta name="description" content="This is a description of my React app" />
      </head>

      {/* Navbar Component */}
      <header>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>

      <main className=''>
        <section id="home">
          <Home />
        </section>
        <section className='comp-sec' id="about">
          <About />
        </section>
        <section className='comp-sec' id="skills">
          <Skills />
        </section>
        <section className='comp-sec' id='projects'>
          <Projects />
        </section>
      </main>

      {/* Footer Component */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
