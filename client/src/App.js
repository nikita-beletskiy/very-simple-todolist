import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(async () => {
    const { data } = await axios.get('/api/users/currentuser');

    setCurrentUser(data.currentUser);
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header currentUser={currentUser} />
      </div>
    </Router>
  );
};

export default App;
