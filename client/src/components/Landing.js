import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Landing = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to our service{currentUser && `, ${currentUser.email}`}!</h1>
    </div>
  );
};

export default Landing;
