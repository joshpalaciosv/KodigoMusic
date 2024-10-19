import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSong } from '../contexts/SongContext';
import { FaThumbsUp } from 'react-icons/fa';
//utilizamos el componente Greeting para brindar un saludo personalizado
import Greeting from './Greeting';



const MainContentContainer = styled.div`
  flex: 1;
  background-color: #121212;
  color: #fff;
  padding: 20px;
  overflow-y: auto;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const PlaylistItem = styled.div`
  background-color: #181818;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: #282828;
  }
`;

const PlaylistImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

// damos estilos al boton de like y la ubicaion en la esquina inferior derecha
// utilizamos el color verde para el boton de like 
const LikeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${props => props.isLiked ? '#1db954' : '#fff'};
  cursor: pointer;
  font-size: 1.5rem;
`;



function MainContent() {
  const location = useLocation();

  //utilizamos el componente SongContext para obtener el estado de la cancion actual y las funciones para manejar los favoritos
  const { setCurrentSong, likedPlaylists, toggleLike } = useSong();

  //definimos una lista de reproduccion con algunas canciones
  //utilizamos una plataforma de imagenes aleatorias para obtener imagenes de prueba
  const playlists = [
    { id:1 , artist:'Shaboozey', name: 'A Bar Song (Tipsy)', image: 'https://picsum.photos/200?random=1' },
    { id:2 , artist:'Billie Eilish', name: 'Birds Of A Feather', image: 'https://picsum.photos/200?random=2' },
    { id:3 , artist:'Post Malone Featuring Morgan Wallen', name: 'I Had Some Help', image: 'https://picsum.photos/200?random=3' },
    { id:4 , artist:'Sabrina Carpenter', name: 'Espresso', image: 'https://picsum.photos/200?random=4' },
    { id:5 , artist:'Lady Gaga & Bruno Mars', name: 'Die With A Smile', image: 'https://picsum.photos/200?random=5' },
    { id:6 , artist:'Chappell Roan', name: 'Good Luck, Babe!', image: 'https://picsum.photos/200?random=6' },
  ];

  const handlePlaylistClick = (playlist) => {
    // utilizamos el state de la cancion actual en SongContext.jsx, setCurrentSong, para actualizar la cancion actual al hacer clic en una lista de reproduccion
    setCurrentSong({ title: playlist.name, artist: playlist.artist });
  };

  

  const renderContent = () => {
    switch (location.pathname) {
      case '/home':
        return (
          <>
            <Greeting />
            <PlaylistGrid>
              {playlists.map((playlist, index) => (
                <PlaylistItem key={index} onClick={() => handlePlaylistClick(playlist)}>
                  <PlaylistImage src={playlist.image} alt={playlist.name} />
                  <h3>{playlist.name}</h3>
                  <p>{playlist.artist}</p>
                  {/* definimos un like button para mostrarlo en la seccion de Tu Libreria*/}
                  <LikeButton
                    // dejamos vivo un prop indicando si la cancion esta en la lista de preferidos
                    isLiked={likedPlaylists[playlist.id]}
                    onClick={() => {
                      toggleLike(playlist.id);
                    }}
                  >
                    <FaThumbsUp />
                  </LikeButton>
                </PlaylistItem>
              ))}
            </PlaylistGrid>
          </>
        );
      case '/library':
        return (
          <>
                <h1>Tu Libreria</h1>
                <PlaylistGrid>
                {playlists.filter(playlist => likedPlaylists[playlist.id]).map((playlist) => (
                  <PlaylistItem key={playlist.id} onClick={() => handlePlaylistClick(playlist)}>
                    <PlaylistImage src={playlist.image} alt={playlist.name} />
                    <h3>{playlist.name}</h3>
                    <p>{playlist.artist}</p>
                    {/* definimos un like button para mostrarlo en la seccion de Tu Libreria*/}
                    <LikeButton
                      isLiked={true}
                      onClick={() => {
                        toggleLike(playlist.id);
                      }}
                    >
                      <FaThumbsUp />
                    </LikeButton>
                  </PlaylistItem>
                ))}
              </PlaylistGrid>
          </>
        );
      default:
        return <h1>Pagina no encontrada</h1>;
    }
  };

  return (
    <MainContentContainer>
      {renderContent()}
    </MainContentContainer>
  );
}

export default MainContent;