import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../styles/Header.js.css';

const Header = () => {
  const { currentUser } = useContext(UserContext);

  const links = [
    !currentUser && { label: 'Sign Up', href: '/signup' },
    !currentUser && { label: 'Sign In', href: '/signin' },
    currentUser && { label: 'Sign Out', href: '/signout' }
  ]
    .filter(link => link)
    .map(({ label, href }) => (
      <Link key={href} to={href}>
        {label}
      </Link>
    ));

  return (
    <div className='header'>
      <h1>Very Simple Todolist</h1>
      <div className='links'>
        <Link to='/'>Home</Link>
        {links}
      </div>
    </div>
  );
};

export default Header;
