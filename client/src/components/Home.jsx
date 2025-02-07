import '../assets/css/home.css';
import waves from '../assets/images/fog.png';
import linkedIn from '../assets/images/LinkedIn.png'
import gitHub from '../assets/images/GitHub.png'
import TypingEffect from './TypingEffect';

const Home = () => {
    return (
        <div>
            <section className="hero" id="hero-1" style={{ backgroundImage: `url(${waves})` }}>
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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;