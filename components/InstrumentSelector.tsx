import React from 'react';
import { InstrumentType } from '../types';

interface InstrumentSelectorProps {
  current: InstrumentType;
  onChange: (inst: InstrumentType) => void;
}

export const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ current, onChange }) => {
  const instruments = [
    { type: InstrumentType.PIANO, label: '🎹 Piano', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
    { type: InstrumentType.GUITAR, label: '🎸 Guitarra', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { type: InstrumentType.FLUTE, label: '🪈 Flauta', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  ];

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {instruments.map((inst) => (
        <button
          key={inst.type}
          onClick={() => onChange(inst.type)}
          className={`
            px-4 py-2 rounded-full border-2 font-semibold transition-all transform hover:scale-105
            ${current === inst.type ? `${inst.color} ring-2 ring-offset-2 ring-blue-300 shadow-md` : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}
          `}
        >
          {inst.label}
        </button>
      ))}
    </div>
  );
};