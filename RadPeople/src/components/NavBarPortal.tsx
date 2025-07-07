import { createPortal } from 'react-dom';
import NavBar from './NavBar'; // your actual NavBar component

const NavBarPortal = () => {
  const navbarRoot = document.getElementById('navbar-root');
  if (!navbarRoot) return null;
  return createPortal(<NavBar />, navbarRoot);
};

export default NavBarPortal;