import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/Header.module.css';
import globalStyles from '../styles/GlobalStyles.module.css';

const Header = () => {
  const { currentUser, isPending } = useContext(UserContext);

  const links = [
    !currentUser && { label: 'Sign Up', href: '/signup' },
    !currentUser && { label: 'Sign In', href: '/signin' },
    currentUser && { label: 'My List', href: '/my-list' },
    currentUser && { label: 'Sign Out', href: '/signout' }
  ]
    .filter(link => link)
    .map(({ label, href }) => (
      <Link key={href} to={href}>
        {label}
      </Link>
    ));

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>Very Simple Todolist</h1>
      </div>
      <div className={styles.menu}>
        <Link to='/'>Home</Link>
        {isPending ? (
          <div className={styles.animbox}>
            <div className={globalStyles.divprogress}>
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : (
          links
        )}
      </div>
    </div>
  );
};

export default Header;
