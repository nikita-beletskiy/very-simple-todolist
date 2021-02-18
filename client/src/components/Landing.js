import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Landing = () => {
  const { currentUser, isPending } = useContext(UserContext);
  const greeting = 'Welcome to our service!';

  return (
    <div>
      <h1>{isPending ? 'Loading...' : greeting}</h1>
      {currentUser && <h2>{currentUser.email}</h2>}
    </div>
  );
};

export default Landing;
