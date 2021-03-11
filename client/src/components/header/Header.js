import { useContext, Suspense, lazy } from 'react';
import Breakpoint from 'react-socks';
import { ErrorsContext } from '../../contexts/ErrorsContext';
import { UserContext } from '../../contexts/UserContext';
import LoadingSpinner from '../LoadingSpinner';

const MobileNav = lazy(() => import('./MobileNav'));
const DesktopNav = lazy(() => import('./DesktopNav'));

const Header = () => {
  const { currentUser, isPending } = useContext(UserContext);
  const { errors } = useContext(ErrorsContext);

  const links = [
    { label: 'Home', href: '/' },
    !currentUser && { label: 'Sign Up', href: '/signup' },
    !currentUser && { label: 'Sign In', href: '/signin' },
    currentUser && { label: 'My List', href: '/my-list' },
    currentUser && { label: 'Sign Out', href: '/signout' }
  ].filter(link => link);

  return (
    <div className='header'>
      {errors}
      <div className='container'>
        <h1>Todolist</h1>

        <Suspense fallback={<LoadingSpinner />}>
          <Breakpoint className='navbar' customQuery='(max-width: 670px)'>
            {isPending ? <LoadingSpinner /> : <MobileNav links={links} />}
          </Breakpoint>

          <Breakpoint className='navbar' customQuery='(min-width: 670px)'>
            {isPending ? <LoadingSpinner /> : <DesktopNav links={links} />}
          </Breakpoint>
        </Suspense>
      </div>
    </div>
  );
};

export default Header;
