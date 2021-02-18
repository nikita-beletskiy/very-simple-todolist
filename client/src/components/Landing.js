import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/Landing.module.css';
import globalStyles from '../styles/GlobalStyles.module.css';

const Landing = () => {
  const { currentUser, isPending } = useContext(UserContext);
  const greeting = 'Welcome to our service!';

  return (
    <div>
      {isPending ? (
        <div className={styles.animbox}>
          <div className={globalStyles.divprogress}>
            <div />
            <div />
            <div />
          </div>
        </div>
      ) : (
        <h1>{greeting}</h1>
      )}
      {currentUser && <h2>{currentUser.email}</h2>}
    </div>
  );
};

export default Landing;
