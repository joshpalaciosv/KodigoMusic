import React, { createContext, useState, useContext, useEffect } from 'react';


// creamos un contexto para compartir el estado de la cancion actual 
const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({ title: '', artist: '' });
  const [likedPlaylists, setLikedPlaylists] = useState({});

  // cargamos los likes guardados en localStorage al iniciar la aplicacion
  useEffect(() => {
     const savedLikes = localStorage.getItem('likedPlaylists');
     // si hay algo guardado en localStorage, lo cargamos en el estado
     if (savedLikes) {
       setLikedPlaylists(JSON.parse(savedLikes));
     }
   }, []);

  const toggleLike = (playlistId) => {

    // actualizamos el estado de likedPlaylists y guardamos en localStorage
    // utilizamos esta funcion callback, que recibe el estado anterior 'prev' y devuelve el nuevo estado
    setLikedPlaylists(
      prev => {
      // con el playlistId como clave, cambiamos el valor de likedPlaylists[playlistId] a su valor contrario
      // asi por ejemplo podemos dejar guardado la cancion 3, pero en false para que no se muestre en la vista
      const newLikedPlaylists = { ...prev, [playlistId]: !prev[playlistId] };
      localStorage.setItem('likedPlaylists', JSON.stringify(newLikedPlaylists));
      return newLikedPlaylists;
      }
    );
  };

  // utilizamos el feature provider de React para pasar el estado y las funciones a los componentes hijos
  // aunque este de inicio en un componente en el mismo nivel.
  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong, likedPlaylists, toggleLike  }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => useContext(SongContext);