export enum InstrumentType {
  PIANO = 'PIANO',
  GUITAR = 'GUITAR',
  FLUTE = 'FLUTE'
}

export interface MusicalNote {
  id: string;
  name: string; // Solfège name (Do, Re, Mi...)
  notation: string; // Scientific notation (C4, D4...)
  frequency: number;
  color: string;
  textColor: string;
}

export interface GameState {
  isActive: boolean;
  targetNote: MusicalNote | null;
  score: number;
  message: string;
  status: 'idle' | 'waiting' | 'success' | 'failure';
}