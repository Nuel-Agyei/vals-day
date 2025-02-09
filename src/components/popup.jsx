import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Popup = () => {
  // State management for different steps of the popup flow
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  // Predefined special messages for specific names
  const specialMessages = {
    "mel": "Mel, thanks for being such a great friend! You're really an irreplaceable part of my life. Happy Val's day✨",
    "beatrice": "Beatrice, you're a true gem! Happy Valentine's! Thank you for your plenty talk and support.💕",
    "lily": "Lily, you're a blooming joy! Happy Valentine's! Thank you for your concern and always keeping me straight🌸",
    'portia': "Damn girl call me ehh. Anyways happy Vals",
    'colby': 'Stay dark friend🖤',
    'may': 'May, you are a true gem! Happy Valentine\'s!💕', 
  };

  // Correct answers required for special messages
  const specialQuestions = {
    "mel": "goodnight sweet dreams...",
    "beatrice": "Ummm word up ig?",
    "lily": "What flower represents you?",
    'portia': "What’s my favorite inside joke?",
    'colby': "mmmmmmmmm?",
    'may': "why'd you pick that word tho😂?",
  };

  const specialAnswers = {
    "mel": ["and all things attached", "all things attached"],
    "beatrice": ["bea"],
    "lily": ["lily", "flower"],
    'portia': ["call me"],
    'colby': ["the darkness"],
    'may': ["our talks"],
  };

  // Handlers to control the flow of modals
  const handleYes = () => setStep(2);
  const handleNo = () => setStep(3);
  
  // Handles submission of special questions
  const handleSpecialAnswerSubmit = () => {
    const cleanedName = name.trim().toLowerCase();
    if (specialAnswers[cleanedName] && specialAnswers[cleanedName].includes(answer.trim().toLowerCase())) {
      setMessage(specialMessages[cleanedName]);
    } else {
      setMessage("That's not the correct answer, try again!");
    }
    setStep(5);
  };

  // Handles name input and assigns messages based on name
  const handleNameSubmit = () => {
    const cleanedName = name.trim().toLowerCase();
    if (specialMessages[cleanedName]) {
      setStep(4);
    } else {
      setMessage(`Happy Valentine's, ${name || 'dear'}! 💘`);
      setStep(5);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-900 text-pink-300 text-lg sm:text-xl md:text-2xl lg:text-3xl p-4">
      {/* Show modal only if step is less than 5 */}
      {step < 5 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 200 } }}
          exit={{ scale: 0 }}
          className="fixed bg-red-800 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-lg text-center w-full max-w-md"
        >
          {/* First step: Ask if user is Mel */}
          {step === 1 && (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Are you Mel?</p>
              <div className="mt-6 flex justify-center gap-4 sm:gap-6">
                <button onClick={handleYes} className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl">Yes</button>
                <button onClick={handleNo} className="bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl">No</button>
              </div>
            </>
          )}

          {/* Second step: Mel's secret question */}
          {step === 2 && (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Good night, sweet dreams...</p>
              <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-6 p-3 sm:p-4 border rounded bg-red-700 text-pink-300 text-lg sm:text-2xl w-full" />
              <button onClick={handleSpecialAnswerSubmit} className="mt-4 bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl">Submit</button>
            </>
          )}

          {/* Third step: Ask for user's name */}
          {step === 3 && (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Enter your name:</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-6 p-3 sm:p-4 border rounded bg-red-700 text-pink-300 text-lg sm:text-2xl w-full" />
              <button onClick={handleNameSubmit} className="mt-4 bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl">Submit</button>
            </>
          )}

          {/* Fourth step: Ask special question */}
          {step === 4 && (
            <>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{specialQuestions[name.trim().toLowerCase()]}</p>
              <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-6 p-3 sm:p-4 border rounded bg-red-700 text-pink-300 text-lg sm:text-2xl w-full" />
              <button onClick={handleSpecialAnswerSubmit} className="mt-4 bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-lg sm:text-2xl">Submit</button>
            </>
          )}
        </motion.div>
      )}

      {/* Final step: Display special message */}
      {step === 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          className="text-center bg-red-800 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-lg text-pink-300 w-full max-w-md"
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{message}</p>
        </motion.div>
      )}
    </div>
  );0
};

export default Popup;
