import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function speakText(text, lang = 'hi-IN') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    // ignore
  }

  // Clean text from parenthetical guides for speech
  const speechContent = text.replace(/\(.*?\)/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(speechContent || text);
  
  utterance.lang = lang;
  const isStudentMode = typeof window !== "undefined" && window.__isStudentPortalActive;
  utterance.rate = isStudentMode ? 0.65 : 0.70; // Slower, clearer cadence for classroom learners
  utterance.pitch = 0.98;

  // Try to find a natural Indian English or Hindi voice
  try {
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => 
      v.lang.startsWith('hi') || 
      v.lang.includes('Hindi') || 
      v.lang.includes('India') ||
      v.lang.startsWith('en-IN')
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  } catch (err) {
    console.warn('Voice lookup warning:', err);
  }

  window.speechSynthesis.speak(utterance);
}

export function AudioButton({ text, lang = 'hi-IN', className = '', size = 'md' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakText(text, lang);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      title="उच्चारण सुनें"
      className={`p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100/80 active:scale-95 transition-all flex items-center justify-center ${
        isPlaying ? 'bg-emerald-200 text-emerald-900 ring-2 ring-emerald-400' : 'bg-emerald-50/90'
      } ${className}`}
    >
      <Volume2 className={`${iconSizes[size] || 'w-4 h-4'} ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
}
