import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);

  const updateCurrentUser = newUser => setCurrentUser(newUser);

  useEffect(async () => {
    const { data } = await axios.get('/api/users/currentuser');

    setCurrentUser(data.currentUser);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
