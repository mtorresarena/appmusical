import React, { useState, useEffect, useCallback } from 'react';
import { Key } from './components/Key';
import { InstrumentSelector } from './components/InstrumentSelector';
import { TriviaCard } from './components/TriviaCard';
import { SCALE } from './constants';
import { InstrumentType, MusicalNote, GameState } from './types';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [instrument, setInstrument] = useState<InstrumentType>(InstrumentType.PIANO);
  const [lastPlayed, setLastPlayed] = useState<MusicalNote | null>(null);
  
  const [game, setGame] = useState<GameState>({
    isActive: false,
    targetNote: null,
    score: 0,
    message: "¡Escucha y adivina!",
    status: 'idle'
  });

  // Handle note playing
  const playNote = useCallback((note: MusicalNote) => {
    audioService.playNote(note.frequency, instrument);
    setLastPlayed(note);

    if (game.isActive && game.status === 'waiting') {
        checkGameGuess(note);
    }
  }, [instrument, game.isActive, game.status]); // Add checkGameGuess to deps if defined outside, or keep simple logic here

  // Game Logic
  const checkGameGuess = (playedNote: MusicalNote) => {
    if (!game.targetNote) return;

    if (playedNote.id === game.targetNote.id) {
      setGame(prev => ({
        ...prev,
        score: prev.score + 10,
        message: "¡Correcto! 🎵 Muy bien.",
        status: 'success'
      }));
      // Auto start next round after delay
      setTimeout(() => startRound(), 1500);
    } else {
      setGame(prev => ({
        ...prev,
        message: "¡Casi! Intenta de nuevo.",
        status: 'failure'
      }));
      // Reset status to waiting after short delay to allow retry
      setTimeout(() => setGame(prev => ({...prev, status: 'waiting', message: "Intenta de nuevo."})), 1000);
    }
  };

  const startGame = () => {
    setGame({
      isActive: true,
      targetNote: null,
      score: 0,
      message: "Escucha atentamente...",
      status: 'idle'
    });
    startRound();
  };

  const startRound = () => {
    const randomNote = SCALE[Math.floor(Math.random() * SCALE.length)];
    setGame(prev => ({
      ...prev,
      targetNote: randomNote,
      message: "Escuchando...",
      status: 'idle' // Preventing interaction while playing
    }));

    // Play the target sound
    setTimeout(() => {
        audioService.playNote(randomNote.frequency, instrument);
        setGame(prev => ({
            ...prev,
            message: "¿Qué nota sonó?",
            status: 'waiting'
        }));
    }, 500);
  };

  const stopGame = () => {
    setGame({
        isActive: false,
        targetNote: null,
        score: 0,
        message: "¡Juega cuando quieras!",
        status: 'idle'
    });
  };

  const replayTargetNote = () => {
      if (game.targetNote && game.status === 'waiting') {
        audioService.playNote(game.targetNote.frequency, instrument);
      }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-black text-sky-600 tracking-tight mb-2 drop-shadow-sm">
          Aula Musical 🎵
        </h1>
        <p className="text-lg text-slate-500 font-medium">Aprende, Toca y Juega</p>
      </header>

      <main className="w-full max-w-4xl bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/60">
        
        {/* Controls Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <InstrumentSelector current={instrument} onChange={setInstrument} />
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-slate-100">
                {!game.isActive ? (
                    <button 
                        onClick={startGame}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-transform transform active:scale-95 shadow-lg shadow-green-200"
                    >
                        🎮 Jugar a Adivinar
                    </button>
                ) : (
                    <div className="flex items-center gap-3 px-2">
                         <span className="font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Puntos: {game.score}</span>
                         <button 
                            onClick={stopGame}
                            className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                            Salir
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Game Feedback Area */}
        {game.isActive && (
            <div className={`mb-6 p-4 rounded-xl text-center transition-colors duration-300 ${
                game.status === 'success' ? 'bg-green-100 text-green-800' :
                game.status === 'failure' ? 'bg-red-100 text-red-800' : 'bg-sky-50 text-sky-800'
            }`}>
                <p className="text-xl font-bold">{game.message}</p>
                {game.status === 'waiting' && (
                    <button 
                        onClick={replayTargetNote}
                        className="mt-2 text-sm underline opacity-70 hover:opacity-100"
                    >
                        🔊 Repetir Sonido
                    </button>
                )}
            </div>
        )}

        {/* Keyboard Display */}
        <div className="flex justify-center items-end h-64 sm:h-80 mb-6 pb-4 overflow-x-auto">
          {SCALE.map((note) => (
            <Key 
              key={note.id} 
              note={note} 
              onClick={playNote}
              highlight={game.status === 'success' && game.targetNote?.id === note.id}
            />
          ))}
        </div>

        {/* Visual Feedback of Last Played Note (Educational Mode) */}
        {!game.isActive && lastPlayed && (
             <div className="text-center animate-bounce-short">
                 <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-1">Has tocado</p>
                 <div className={`inline-block px-6 py-2 rounded-full text-2xl font-bold ${lastPlayed.color} ${lastPlayed.textColor} shadow-lg`}>
                     {lastPlayed.name} <span className="text-base opacity-75">({lastPlayed.notation})</span>
                 </div>
             </div>
        )}

        {/* Gemini Integration */}
        <div className="border-t border-slate-200 pt-6 mt-6">
            <TriviaCard instrument={instrument} />
        </div>

      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm">
         <p>Hecho con ❤️ y React</p>
      </footer>
    </div>
  );
};

export default App;