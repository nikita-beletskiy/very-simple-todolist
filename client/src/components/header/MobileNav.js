import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import styles from '../../styles/Header.module.css';

const Menu = ({ links }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [fadingMenuClass, setFadingMenuClass] = useState(null);

  const showingMenu = () => {
    setFadingMenuClass(null);
    setShowMenu(true);
  };

  const fadingMenu = () => {
    setFadingMenuClass(styles.fading);
    setTimeout(() => {
      setShowMenu(false);
    }, 500);
  };

  return (
    <>
      {(!showMenu || fadingMenuClass) && (
        <HiMenuAlt4 size='2.5em' onClick={showingMenu} />
      )}
      {showMenu && (
        <div className={`p-2 ${styles.menu} ${fadingMenuClass}`}>
          <IoClose size='2.5rem' onClick={fadingMenu} />
          {links.map(({ label, href }) => (
            <Link className='py-1' key={href} to={href} onClick={fadingMenu}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Menu;
