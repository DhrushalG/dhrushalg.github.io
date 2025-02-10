import { useState } from "react";
import Sudoku from "../projects/sudoku/Sudoku";
import Wordle from "../projects/wordle/Wordle";
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
            description: "Sudoku is a number puzzle game where players must fill a 9x9 grid with numbers from 1 to 9, ensuring that each number appears only once per row, column, and 3x3 subgrid. The game offers multiple difficulty levels, and a timer tracks the player's speed as they solve the puzzle. Built with React, it features dynamic state management to handle puzzle-solving interactions and provide a smooth user experience.",
            component: <Sudoku />,
            tech: [JavaScript, ReactJs, TailWind]
        },
        2: { 
            name: "Wordle", 
            description: "Wordle is a word-guessing game where players have a limited number of attempts to guess the correct word. Feedback on each guess helps players deduce the correct word, with correct letters shown in green and incorrect ones in red. Built with React, the game logic manages player guesses and provides real-time feedback on each attempt to help players solve the puzzle.",
            component: <Wordle />,
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
                <div className="accordian space-y-1">
                    {Object.keys(myProjects).map((id) => (
                        <div key={id} className="rounded">
                            <nav onClick={() => handleAccordionClick(id)} className="acc-title hover:bg-purple-900 rounded" >
                                <span>{myProjects[id].name}</span>
                                <span className="">{selectedProject === id ? "▲" : "▼"}</span>
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
