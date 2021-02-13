import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import useRequest from '../hooks/useRequest';
import '../styles/UserForm.css';

const Signout = () => {
  const { updateCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const { request } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      updateCurrentUser(null);
      history.push('/');
    }
  });

  useEffect(() => {
    request();
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
