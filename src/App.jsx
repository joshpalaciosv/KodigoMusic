import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import Login from './components/Login';
//import CheckFirebaseConnection from './components/CheckFirebaseConnection';
import { SongProvider } from './contexts/SongContext';

// estilos de la aplicacion
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

function App() {

  // inicializamos el estado de isLoggedIn en false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // funcion para verificar si el usuario esta logueado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  // funcion para loguear al usuario
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
 // funcion para cerrar la sesion
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };


  // si el usuario no esta logueado mostramos el componente <Login onLogin={handleLogin} />
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // si esta logueado entonces mostramos el contenido de la aplicacion
  // no existe un Else ya que el return en el IF anterior termina la ejecucion de la funcion.
  return (
    
    <Router>
      {/* agregamos el componente Contexto para enviar la informacion a el player />  */}
      <SongProvider>
      <AppContainer>
      
        <ContentWrapper>
          {/* el componente Sidebar recibe la funcion handleLogout para cerrar la sesion.
          en prop onLogout se llamada desde el componente Sidebar */}

          <Sidebar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<MainContent />} />
            <Route path="/search" element={<MainContent />} />
            <Route path="/library" element={<MainContent />} />
          </Routes>
        </ContentWrapper>
          <Player />
      </AppContainer>
      </SongProvider>
    </Router>
  );
}

export default App;