import React from 'react';
import { MusicalNote } from '../types';

interface KeyProps {
  note: MusicalNote;
  onClick: (note: MusicalNote) => void;
  disabled?: boolean;
  highlight?: boolean;
}

export const Key: React.FC<KeyProps> = ({ note, onClick, disabled, highlight }) => {
  return (
    <button
      onClick={() => onClick(note)}
      disabled={disabled}
      className={`
        relative h-32 w-12 sm:h-48 sm:w-16 md:h-64 md:w-20 lg:w-24 
        rounded-b-lg mx-1 focus:outline-none transition-all duration-100
        key-shadow flex flex-col justify-end items-center pb-4
        ${note.color} ${note.textColor}
        ${highlight ? 'ring-4 ring-yellow-400 scale-105 z-10' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-110'}
      `}
      aria-label={`Nota ${note.name}`}
    >
      <span className="text-xl font-bold mb-1">{note.name}</span>
      <span className="text-xs opacity-75 font-mono">{note.notation}</span>
      
      {/* Reflection effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-20 pointer-events-none rounded-b-lg"></div>
    </button>
  );
};