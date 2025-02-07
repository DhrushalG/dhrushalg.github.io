import React from 'react';
import Java from '../assets/images/java-logo.png';
import CSharp from '../assets/images/Csharp-logo.png';
import Python from '../assets/images/python-logo.png';
import Are from '../assets/images/r-logo.png';
import Js from '../assets/images/js-logo.png';
import Ts from '../assets/images/ts-logo.png';
import Git from '../assets/images/git-logo.png';
import '../assets/css/skills.css';
import Sql from '../assets/images/SQL-logo.png';
import MongoDb from '../assets/images/MongoDb-logo.png';
import Flask from '../assets/images/Flask-logo.png';
import DotNet from '../assets/images/DotNet.png';
import PowerBi from '../assets/images/PowerBi-logo.png';
import Tableau from '../assets/images/Tableau-logo.png';
import Expressjs from '../assets/images/Expressjs-logo.png';
import Nodejs from '../assets/images/Nodejs-logo.png';
import Reactjs from '../assets/images/React-logo.png';
import Pandas from '../assets/images/pandas-logo.png';
import TensorFlow from '../assets/images/tensorflow-logo.png';
import ScikitLearn from '../assets/images/sci-kit-logo.png'

const languages = [
    { str: 'Java', logo: Java },
    { str: 'C#', logo: CSharp },
    { str: 'Python', logo: Python },
    { str: 'JavaScript', logo: Js },
    { str: 'TypeScript', logo: Ts },
    { str: 'R', logo: Are },
];

const webDevelopment = [
    { str: '.NET', logo: DotNet },
    { str: 'Flask', logo: Flask },
    { str: 'Express.js', logo: Expressjs },
    { str: 'React', logo: Reactjs },
    { str: 'Node.js', logo: Nodejs },
    { str: 'Git', logo: Git },
];

const dataScienceML = [
    { str: 'SQL', logo: Sql },
    { str: 'MongoDB', logo: MongoDb },
    { str: 'Power BI', logo: PowerBi },
    { str: 'Tableau', logo: Tableau },
    { str: 'Pandas', logo: Pandas },
    { str: 'TensorFlow', logo: TensorFlow },
    { str: 'Scikit-learn', logo: ScikitLearn },
];

const Skills = ({ darkMode }) => {
    return (
        <section className="skills-sect">
            <br className='' />
            <p className="text-3xl lg:text-5xl md:text-4xl sm:text-4xl font-bold pt-12 mt-2">Skills</p>
            <p className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold mt-10">Languages</p>
            <div className={`bubble-box`}>
                {languages.map((skill, index) => (
                    <div key={index} className="relative flex items-center justify-center mb-10 group">
                        <div className="shadow-bubble"></div>
                        <div className="skill-bubble m-3  rounded-full ">
                            <img src={skill.logo} alt={skill.str} className="skill-img spin-on-hover" />
                            <div className="text-md lg:text-xl md:text-lg sm:text-md skill-name absolute text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                {skill.str}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold mt-10">Web Development</p>
            <div className={`bubble-box`}>
                {webDevelopment.map((skill, index) => (
                    <div key={index} className="relative flex items-center justify-center mb-10 group">
                        <div className="shadow-bubble"></div>
                        <div className="skill-bubble m-3 rounded-full ">
                            <img src={skill.logo} alt={skill.str} className="skill-img spin-on-hover" />
                            <div className="text-md lg:text-xl md:text-lg sm:text-md skill-name absolute text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                {skill.str}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold mt-10">Data Science & Machine Learning</p>
            <div className={`bubble-box ${darkMode ? 'bg-dark' : 'bg-light'}`}>
                {dataScienceML.map((skill, index) => (
                    <div key={index} className=" relative flex items-center justify-center mb-10 group">
                        <div className="shadow-bubble"></div>
                        <div className="skill-bubble m-3 rounded-full ">
                            <img src={skill.logo} alt={skill.str} className="skill-img spin-on-hover" />
                            <div className="text-md lg:text-xl md:text-lg sm:text-md skill-name absolute text-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                {skill.str}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Skills;