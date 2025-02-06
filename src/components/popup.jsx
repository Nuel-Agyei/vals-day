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
    "mel": "Mel, thanks for being such a great friend! Happy Val's day✨",
    "beatrice": "Beatrice, may your day be as beautiful as you! 💕",
    "lily": "Lily, you're a blooming joy! Happy Valentine's! 🌸",
    'portia': "Damn girl call me ehh"
  };

  // Correct answer required for Mel to receive the special message
  const correctAnswerForMel = "and all things attached";
  const altAnswer = 'all things attached';

  // Handlers to control the flow of modals
  const handleYes = () => setStep(2);
  const handleNo = () => setStep(3);
  
  // Handles submission of Mel's special question
  const handleMelAnswerSubmit = () => {
    if (answer.trim().toLowerCase() === correctAnswerForMel.toLowerCase() || 
    answer.trim().toLowerCase() === altAnswer) {
      setMessage(specialMessages["mel"]);
    } else {
      setMessage("That's not the correct answer, try again!");
    }
    setStep(5);
  };

  // Handles name input and assigns messages based on name
  const handleNameSubmit = () => {
    const cleanedName = name.trim().toLowerCase();
    if (specialMessages[cleanedName]) {
      setMessage(specialMessages[cleanedName]);
    } else {
      setMessage(`Happy Valentine's, ${name || 'dear'}! 💘`); // Default message for unrecognized names
    }
    setStep(5);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-900 text-pink-300 text-3xl">
      {/* Show modal only if step is less than 5 */}
      {step < 5 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 200 } }}
          exit={{ scale: 0 }}
          className="fixed bg-red-800 p-12 rounded-2xl shadow-lg text-center"
        >
          {/* First step: Ask if user is Mel */}
          {step === 1 && (
            <>
              <p className="text-4xl font-bold">Are you Mel?</p>
              <div className="mt-6 flex justify-center gap-6">
                <button onClick={handleYes} className="bg-red-500 text-white px-6 py-3 rounded text-2xl">Yes</button>
                <button onClick={handleNo} className="bg-gray-500 text-white px-6 py-3 rounded text-2xl">No</button>
              </div>
            </>
          )}

          {/* Second step: Mel's secret question */}
          {step === 2 && (
            <>
              <p className="text-4xl font-bold">Good night, sweet dreams</p>
              <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-6 p-4 border rounded bg-red-700 text-pink-300 text-2xl" />
              <button onClick={handleMelAnswerSubmit} className="mt-4 bg-red-500 text-white px-6 py-3 rounded text-2xl">Submit</button>
            </>
          )}

          {/* Third step: Ask for user's name */}
          {step === 3 && (
            <>
              <p className="text-4xl font-bold">Enter your name:</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-6 p-4 border rounded bg-red-700 text-pink-300 text-2xl" />
              <button onClick={handleNameSubmit} className="mt-4 bg-red-500 text-white px-6 py-3 rounded text-2xl">Submit</button>
            </>
          )}
        </motion.div>
      )}

      {/* Final step: Display special message */}
      {step === 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          className="text-center bg-red-800 p-12 rounded-2xl shadow-lg text-pink-300"
        >
          <p className="text-4xl font-bold">{message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
