// PlayerContext.js
import React, { createContext, useState, useContext } from 'react';

// Membuat context
const PlayerContext = createContext();

// Membuat Provider untuk context
export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');

  return (
    <PlayerContext.Provider value={{ playerName, setPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook untuk mengakses context
export const usePlayer = () => {
  return useContext(PlayerContext);
};
