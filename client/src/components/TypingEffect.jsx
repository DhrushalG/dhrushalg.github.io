import { useEffect, useState } from 'react';
import '../assets/css/home.css';

const TypingEffect = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [phraseIndex, setPhraseIndex] = useState(0);
    
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseAfterTyping = 1000;
    const pauseAfterDeleting = 500;

    useEffect(() => {
        const phrases = ['full-stack developer', 'software engineer', 'data analyst'];
        let timer;
        const currentPhrase = phrases[phraseIndex];
        if (!isDeleting && charIndex < currentPhrase.length) {
            // Add
            timer = setTimeout(() => {
                setText((prev) => prev + currentPhrase[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Remove
            timer = setTimeout(() => {
                setText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            }, deletingSpeed);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause
            timer = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        } else if (isDeleting && charIndex === 0) {
            // Pause after deleting
            timer = setTimeout(() => {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }, pauseAfterDeleting);
        }
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex]);
    return (
        <div className='flex'>
            <p className='text-1xl md:text-3xl sm:text-2xl mr-5 p-1'>I am a </p>
            <span className="typing-effect gradient h-8"> {text}&nbsp;</span>
        </div>
    );
};

export default TypingEffect;



