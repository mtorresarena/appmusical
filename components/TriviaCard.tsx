import React, { useState } from 'react';
import { getMusicTrivia } from '../services/geminiService';
import { InstrumentType } from '../types';

interface TriviaCardProps {
  instrument: InstrumentType;
}

export const TriviaCard: React.FC<TriviaCardProps> = ({ instrument }) => {
  const [trivia, setTrivia] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchTrivia = async () => {
    setLoading(true);
    // Translate Enum to Spanish string for better prompt
    const topicMap = {
      [InstrumentType.PIANO]: "el piano",
      [InstrumentType.GUITAR]: "la guitarra acústica",
      [InstrumentType.FLUTE]: "la flauta dulce"
    };
    
    const fact = await getMusicTrivia(topicMap[instrument]);
    setTrivia(fact);
    setLoading(false);
  };

  return (
    <div className="mt-8 max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg border border-purple-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
          <span>✨</span> Curiosidad Musical
        </h3>
        <button 
          onClick={fetchTrivia}
          disabled={loading}
          className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full transition-colors"
        >
          {loading ? 'Pensando...' : '¡Dime algo!'}
        </button>
      </div>
      
      {trivia ? (
         <div className="bg-purple-50 p-3 rounded-xl text-purple-900 text-sm leading-relaxed animate-fade-in">
           {trivia}
         </div>
      ) : (
        <p className="text-gray-400 text-sm italic p-2 text-center">
          Pulsa el botón para aprender algo nuevo sobre este instrumento.
        </p>
      )}
    </div>
  );
};