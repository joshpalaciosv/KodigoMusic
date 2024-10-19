import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSong } from '../contexts/SongContext';


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

function MainContent() {
  const location = useLocation();

  //console.log(useSong());
  const { setCurrentSong } = useSong();

  const playlists = [
    { artist:'Shaboozey', name: 'A Bar Song (Tipsy)', image: 'https://picsum.photos/200?random=1' },
    { artist:'Billie Eilish', name: 'Birds Of A Feather', image: 'https://picsum.photos/200?random=2' },
    { artist:'Post Malone Featuring Morgan Wallen', name: 'I Had Some Help', image: 'https://picsum.photos/200?random=3' },
    { artist:'Sabrina Carpenter', name: 'Espresso', image: 'https://picsum.photos/200?random=4' },
    { artist:'Lady Gaga & Bruno Mars', name: 'Die With A Smile', image: 'https://picsum.photos/200?random=5' },
    { artist:'Chappell Roan', name: 'Good Luck, Babe!', image: 'https://picsum.photos/200?random=6' },
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
            <h1>Good afternoon</h1>
            <PlaylistGrid>
              {playlists.map((playlist, index) => (
                <PlaylistItem key={index} onClick={() => handlePlaylistClick(playlist)}>
                  <PlaylistImage src={playlist.image} alt={playlist.name} />
                  <h3>{playlist.name}</h3>
                </PlaylistItem>
              ))}
            </PlaylistGrid>
          </>
        );
      case '/search':
        return <h1>Search</h1>;
      case '/library':
        return <h1>Your Library</h1>;
      default:
        return <h1>Page not found</h1>;
    }
  };

  return (
    <MainContentContainer>
      {renderContent()}
    </MainContentContainer>
  );
}

export default MainContent;