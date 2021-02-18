import { createContext, useState } from 'react';
import useRequest from '../hooks/useRequest';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const { isPending } = useRequest({
    url: '/api/users/currentuser',
    withEffect: true,
    onSuccess: data => setCurrentUser(data.currentUser),
    onFailure: err => setError(err)
  });

  const updateCurrentUser = newUser => setCurrentUser(newUser);

  return (
    <UserContext.Provider
      value={{ isPending, currentUser, error, updateCurrentUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
