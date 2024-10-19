import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({ title: '', artist: '' });

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);