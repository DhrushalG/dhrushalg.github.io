import '../assets/css/about.css';
import aboutme1 from '../assets/images/aboutme1.jpg'
const About = () => {
    return (
        <section className="about mb-10">
            <h2 className="text-3xl lg:text-5xl md:text-4xl sm:text-4xl font-bold my-6 mt-20">About Me</h2>
            <p className="text-xl lg:text-3xl md:text-3xl sm:text-2xl mb-4 pb-5 px-5">
            I am a passionate and versatile developer with expertise in software development, full-stack web development, 
            and a strong foundation in object-oriented programming and data structures. I thrive on solving complex problems 
            and building intuitive, user-friendly applications. My experience spans DevOps, managing CI/CD pipelines, and 
            deploying scalable applications, as well as data analysis using Python and R to extract meaningful insights. I 
            am constantly learning and staying up to date with the latest technologies, striving to create impactful solutions. 
            This portfolio website reflects my skills, projects, and commitment to building high-quality software that 
            makes a difference.
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