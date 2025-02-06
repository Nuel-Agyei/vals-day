import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Popup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const specialMessages = {
    "mel": "Mel, thanks for being such a great friend! Happy Val's day✨",
    "beatrice": "Beatrice, may your day be as beautiful as you! 💕",
    "lily": "Lily, you're a blooming joy! Happy Valentine's! 🌸"
  };

  const correctAnswerForMel = "and all things attached"; // Specify the correct answer here
  const altAnswer = "all things attached"; // Specify the correct answer here

  const handleYes = () => setStep(2);
  const handleNo = () => setStep(3);
  
  const handleMelAnswerSubmit = () => {
    if (answer.trim().toLowerCase() === correctAnswerForMel.toLowerCase()) {
      setMessage(specialMessages["mel"]);
    } else {
      setMessage("That's not the correct answer, try again!");
    }
    setStep(5);
  };

  const handleNameSubmit = () => {
    const cleanedName = name.trim().toLowerCase();
    if (specialMessages[cleanedName]) {
      setMessage(specialMessages[cleanedName]);
    } else {
      setMessage(`Happy Valentine's, ${name}! 💘`);
    }
    setStep(4);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-900 text-pink-300 text-3xl">
      {step < 5 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 200 } }}
          exit={{ scale: 0 }}
          className="fixed bg-red-800 p-12 rounded-2xl shadow-lg text-center"
        >
          {step === 1 && (
            <>
              <p className="text-4xl font-bold">Are you Mel?</p>
              <div className="mt-6 flex justify-center gap-6">
                <button onClick={handleYes} className="bg-red-500 text-white px-6 py-3 rounded text-2xl">Yes</button>
                <button onClick={handleNo} className="bg-gray-500 text-white px-6 py-3 rounded text-2xl">No</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-4xl font-bold">Good night, sweet dreams...</p>
              <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-6 p-4 border rounded bg-red-700 text-pink-300 text-2xl" />
              <button onClick={handleMelAnswerSubmit} className="sub mt-4 ml-2 bg-red-500 text-white px-6 py-3 rounded text-2xl">Submit</button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-4xl font-bold">Enter your name:</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-6 p-4 border rounded bg-red-700 text-pink-300 text-2xl" />
              <button onClick={handleNameSubmit} className="mt-4 bg-red-500 text-white px-6 py-3 rounded text-2xl">Submit</button>
            </>
          )}
        </motion.div>
      )}

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
