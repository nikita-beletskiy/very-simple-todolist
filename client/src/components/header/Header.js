import { useContext, Suspense, lazy } from 'react';
import Breakpoint from 'react-socks';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import styles from '../../styles/Header.module.css';
import LoadingSpinner from '../LoadingSpinner';

const MobileNav = lazy(() => import('./MobileNav'));
const DesktopNav = lazy(() => import('./DesktopNav'));

const Header = () => {
  const { currentUser, isPending } = useContext(UserContext);

  const links = [
    { label: 'Home', href: '/' },
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
    <Suspense fallback={<LoadingSpinner />}>
      <div className={styles.header}>
        <div className='container flex'>
          <h1>Todolist</h1>

          <Breakpoint
            className={styles.navbar}
            customQuery='(max-width: 670px)'
          >
            {isPending ? (
              <LoadingSpinner size='1.2em' />
            ) : (
              <MobileNav links={links} />
            )}
          </Breakpoint>

          <Breakpoint
            className={styles.navbar}
            customQuery='(min-width: 670px)'
          >
            {isPending ? (
              <LoadingSpinner size='1.5em' />
            ) : (
              <DesktopNav links={links} />
            )}
          </Breakpoint>
        </div>
      </div>
    </Suspense>
  );
};

export default Header;
