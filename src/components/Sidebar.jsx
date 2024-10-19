import React from 'react';
import styled from 'styled-components';
import { FaHome, FaSearch, FaBook, FaSignOutAlt} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';


//dando estilos al sidebar al cuerpo principal
//se utiliza el feature @media para darle estilos cuando la pagina es menor a 768px
const SidebarContainer = styled.div`
  width: 200px;
  background-color: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;
//dando estilos a los elementos del sidebar
const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  opacity: 0.7;
  text-decoration: none;
  color: #fff;

  &.active {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

//ocultando el texto cuando la pagina es menor a 768px
const MenuText = styled.span`
  margin-left: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
//ocultando cunado pagina es menor a 768px
const MenuImg = styled.div`
  
  @media (max-width: 768px) {
    display: none;
  }
`;
// mostrando la imagen del logo
const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 30px;
`;

function Sidebar({ onLogout }) {
  const location = useLocation();

  return (
    <SidebarContainer>
      <MenuImg>
        <Logo src={logo} alt="Logo" style={{ marginBottom: '20px' }} /> {/* logo del aplicativo */}
      </MenuImg>  
      <MenuItem to="/home" className={location.pathname === '/home' ? 'active' : ''}>
        <FaHome />
        <MenuText>Principal</MenuText>
      </MenuItem>
      {/* <MenuItem to="/search" className={location.pathname === '/search' ? 'active' : ''}>
        <FaSearch />
        <MenuText>Buscar</MenuText>
      </MenuItem> */}
      <MenuItem to="/library" className={location.pathname === '/library' ? 'active' : ''}>
        <FaBook />
        <MenuText>Tu Libreria</MenuText>
      </MenuItem>
      {/* utilizando nuevamente un evento para cerrar sesion. <Sidebar onLogout={handleLogout} /> en App.jsx */}
      {/* tambien utilizamos el feature as para que el suguiente elemento MenuItem sea un div ya que arriba se define como un NavLink con ello
      podemos utilizar el onclick*/}
      <MenuItem as="div" onClick={onLogout}>
        <FaSignOutAlt />
        <MenuText>Salir</MenuText>
      </MenuItem>
    </SidebarContainer>
  );
}

export default Sidebar;