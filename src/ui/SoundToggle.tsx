import { useState } from 'react';
import { setMuted, sfxClick } from '../audio/sfx';
import './SoundToggle.css';

export function SoundToggle() {
  const [muted, setMutedState] = useState(true);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) sfxClick(); // play a click to confirm sound is on
  };

  return (
    <button
      className="sound-toggle"
      onClick={toggle}
      aria-label={muted ? 'Enable sound effects' : 'Disable sound effects'}
      title={muted ? 'Sound off' : 'Sound on'}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      )}
    </button>
  );
}
