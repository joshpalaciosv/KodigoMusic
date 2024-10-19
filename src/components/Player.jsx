import React from 'react';
import styled from 'styled-components';
import { FaPlayCircle, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useSong } from '../contexts/SongContext';


const PlayerContainer = styled.div`
  background-color: #181818;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SongInfo = styled.div`
  flex: 1;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #535353;
  margin: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

function Player() {
  // utilizamos el state de la cancion actual en SongContext.jsx, currentSong, para mostrar la informacion de la cancion actual en el reproductor
  const { currentSong } = useSong();

  return (
    <PlayerContainer>
      <SongInfo>
        <h4>{currentSong.title || 'No Seleccionado'}</h4>
        <p>{currentSong.artist || 'Seleccione una canción'}</p>
      </SongInfo>
      <Controls>
        <FaStepBackward />
        <FaPlayCircle size={32} />
        <FaStepForward />
      </Controls>
      <ProgressBar />
    </PlayerContainer>
  );
}

export default Player;