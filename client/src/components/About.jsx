import '../assets/css/about.css';
import aboutme1 from '../assets/images/aboutme1.jpg'
const About = () => {
    return (
        <section className="about text-center mb-10">
            <h2 className="text-3xl lg:text-5xl md:text-4xl sm:text-4xl font-bold my-6 mt-20">About Me</h2>
            <p className="text-xl lg:text-3xl md:text-3xl sm:text-2xl mb-4 max-w-5xl pb-5 mx-auto">
                I am a passionate developer who loves creating innovative web applications. 
                With a strong foundation in both front-end and back-end technologies, I thrive 
                on solving complex problems and delivering intuitive, user-friendly solutions. 
                My goal is to continuously learn and stay up to date with the latest trends, 
                building impactful products that make a difference.
            </p>
            <div className='img-sec'>
                <div className='abt-box'>
                    <img className='abt-img' src={aboutme1} alt="" />
                </div>
                <div className='abt-box'>
                    <img className='abt-img' src={aboutme1}  alt="" />
                </div>
                <div className='abt-box'>
                    <img className='abt-img' src={aboutme1}  alt="" />
                </div>
            </div>
        
        </section>
    );
};

export default About;