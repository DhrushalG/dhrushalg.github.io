import { useState } from "react";
import Sudoku from "./Sudoku";
import "../assets/css/projects.css";
import JavaScript from '../assets/images/js-logo.png';
import ReactJs from '../assets/images/React-logo.png';
import TailWind from '../assets/images/tailwind-logo.png';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleAccordionClick = (projectId) => {
        setSelectedProject(selectedProject === projectId ? null : projectId);
    };

    const myProjects = {
        1: { 
            name: "Sudoku", 
            description: "A fun and challenging Sudoku game featuring various difficulty levels and a timer to track your speed. This application was built with React, utilizing state management to create a dynamic and engaging puzzle-solving experience.",
            component: <Sudoku />,
            tech: [JavaScript, ReactJs, TailWind]
        },
        2: { 
            name: "Project 2", 
            description: "Description for Project 2",
            component: <div>Project 2 content...</div>,
            tech: ["Node", "Express", "MongoDB"]
        },
        3: { 
            name: "Project 3", 
            description: "Description for Project 3",
            component: <div>Project 3 content...</div>,
            tech: ["Python", "Flask", "PostgreSQL"]
        },
    };

    return (
        <div className="">
            <br />
            <p className="pt-5 text-3xl lg:text-5xl md:text-4xl sm:text-4xl font-bold my-10">
                Projects
            </p>
            <div className="projects">
                {/* Left Side: Accordion for project selection */}
                <div className="accordian p-5 space-y-2">
                    {Object.keys(myProjects).map((id) => (
                        <div key={id} className="rounded">
                            <nav
                                onClick={() => handleAccordionClick(id)}
                                className="acc-title hover:bg-purple-700 rounded p-2 flex justify-between text-white"
                            >
                                <span>{myProjects[id].name}</span>
                                <span>{selectedProject === id ? "▲" : "▼"}</span>
                            </nav>
                            {selectedProject === id && (
                                <div className="pro-description p-3">
                                    <p>{myProjects[id].description}</p>
                                    <div className="flex justify-end">
                                        <p className="mr-2">Tech Used:</p>
                                        <div className="tech-logos">
                                            {myProjects[id].tech.map((tech, index) => (
                                                <img key={index} src={tech} alt={tech} className="mx-1"/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Side: Content based on selected project */}
                <div className="project-space p-5">
                    {selectedProject && myProjects[selectedProject] && (
                        <div className="project-content">{myProjects[selectedProject].component}</div>
                    )}
                    {!selectedProject && <div className="text-center">Select a project to view details.</div>}
                </div>
            </div>
        </div>
    );
};

export default Projects;
