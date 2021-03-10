import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const Menu = ({ links }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {!showMenu && (
        <HiMenuAlt4 size='2.5em' onClick={() => setShowMenu(!showMenu)} />
      )}
      <div className={`menu ${showMenu && 'open'}`}>
        <IoClose size='2.5rem' onClick={() => setShowMenu(!showMenu)} />
        {links.map(({ label, href }) => (
          <Link key={href} to={href} onClick={() => setShowMenu(!showMenu)}>
            {label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;
