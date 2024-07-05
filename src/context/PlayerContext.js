"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext({

});

export const PlayerContextProvider = ({ children }) => {
  const [playerState, setPlayerState] = useState({
    trackUrl: 'https://soundcloud.com/satyarecs/yokoo-i-want-more-of-you-superlounge-remix'
  });
  const handlePlayerState = (state) => {
    setPlayerState(state);
  }

  return (
    // the Provider gives access to the context to its children
    <PlayerContext.Provider value={{playerState, handlePlayerState}}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext)
}