import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import styles from '../../styles/Header.module.css';

const Menu = ({ links }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {!showMenu && (
        <HiMenuAlt4 size='2.5em' onClick={() => setShowMenu(true)} />
      )}
      {showMenu && (
        <div className={`p-2 ${styles.menu}`}>
          <IoClose size='2.5rem' onClick={() => setShowMenu(false)} />
          {links}
        </div>
      )}
    </>
  );
};

export default Menu;
