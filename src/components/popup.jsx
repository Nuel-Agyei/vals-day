import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Popup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const specialMessages = {
    "mel": "Mel, thanks for being such a great friend! You're really an irreplaceable part of my life. Happy Val's day💓",
    "beatrice": "Beatrice, you're a true gem! Happy Valentine's! Thank you for your plenty talk and support.💕",
    "lily": "Lily, you're a blooming joy! Happy Valentine's! Thank you for your concern and always keeping me straight🌸",
    "portia": "Damn girl call me ehh. Anyways happy Vals",
    "colby": "Stay dark friend🖤",
    "may": "May, you are a true gem! Happy Valentine’s!💕",
  };

  const specialQuestions = {
    "mel": "Good night, sweet dreams...",
    "beatrice": "Ummm word up ig?",
    "lily": "What flower represents you?",
    "portia": "What’s my favorite inside joke?",
    "colby": "mmmmmmmmm?",
    "may": "Why'd you pick that word tho? 😂",
  };

  const specialAnswers = {
    "mel": ["and all things attached", "all things attached"],
    "beatrice": ["bea"],
    "lily": ["lily", "flower"],
    "portia": ["call me"],
    "colby": ["moon"],
    "may": ["tournedos"],
  };

  const handleYes = () => {
    setName("mel");
    setStep(4);
  };

  const handleNo = () => setStep(3);

  const handleSpecialAnswerSubmit = () => {
    const cleanedName = name.trim().toLowerCase();
    const cleanedAnswer = answer.trim().toLowerCase();

    if (specialAnswers[cleanedName]?.includes(cleanedAnswer)) {
      setMessage(specialMessages[cleanedName]);
    } else {
      setMessage("That's not the correct answer, try again!");
    }
    setStep(5);
  };

  const handleNameSubmit = () => {
    const cleanedName = name.trim().toLowerCase();

    if (specialQuestions[cleanedName]) {
      setStep(4);
    } else {
      setMessage(`Happy Valentine's, ${name || 'dear'}! 💘`);
      setStep(5);
    }
  };

  return (
    <div className="div flex items-center justify-center h-screen text-xl sm:text-4xl md:text-4xl lg:text-4xl p-4">
      {step < 5 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 200 } }}
          exit={{ scale: 0 }}
          className="romantic-glass-container p-6 sm:p-8 md:p-10 lg:p-12 text-center w-full max-w-md"
        >
          {step === 1 && (
            <>
              <p className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-bold">Are you Mel?</p>
              <div className="mt-6 flex justify-center gap-4 sm:gap-6">
                <button onClick={handleYes} className="romantic-button">Yes</button>
                <button onClick={handleNo} className="romantic-button">No</button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className='romantic-input-container'>
              <p className="romantic-label text-4xl">Name please:</p>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="romantic-input" 
              />
              <button onClick={handleNameSubmit} className="romantic-button mt-4">Submit</button>
            </div>   
          )}

          {step === 4 && (
            <div className="romantic-input-container">
              <p className="romantic-label">{specialQuestions[name.trim().toLowerCase()]}</p>
              <input 
                type="text" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
                className="romantic-input" 
              />
              <button onClick={handleSpecialAnswerSubmit} className="romantic-button mt-4">Submit</button>
            </div>
          )}
        </motion.div>
      )}

      {step === 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          className="romantic-glass-container p-6 sm:p-8 md:p-10 lg:p-12  w-full max-w-md"
        >
          <p className="text-4xl sm:text-4xl md:text-3xl lg:text-4xl font-bold">{message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
