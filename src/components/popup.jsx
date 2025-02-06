import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Popup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  const specialMessages = {
    "mel": "Mel, you're loved beyond words! ❤️",
    "beatrice": "Beatrice, may your day be as beautiful as you! 💕",
    "lily": "Lily, you're a blooming joy! Happy Valentine's! 🌸"
  };

  const correctAnswerForMel = "and all things attached"; 
  
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
    <div className="flex items-center justify-center h-screen bg-red-900 text-pink-300">
      {step < 5 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 200 } }}
          exit={{ scale: 0 }}
          className="fixed bg-red-800 p-6 rounded-2xl shadow-lg text-center"
        >
          {step === 1 && (
            <>
              <p className="text-lg font-bold">Are you Mel?</p>
              <div className="mt-4 flex justify-center gap-4">
                <button onClick={handleYes} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
                <button onClick={handleNo} className="bg-gray-500 text-white px-4 py-2 rounded">No</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-lg font-bold">Good night, sweet dreams...</p>
              <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} 
              className="mt-4 p-2 border[1px] rounded bg-red-700 text-pink-300" />
              <button onClick={handleMelAnswerSubmit} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Submit</button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-lg font-bold">Enter your name:</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-4 p-2 border rounded bg-red-700 text-pink-300" />
              <button onClick={handleNameSubmit} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Submit</button>
            </>
          )}
        </motion.div>
      )}

      {step === 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          className="text-center bg-red-800 p-6 rounded-2xl shadow-lg text-pink-300"
        >
          <p className="text-lg font-bold">{message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
