import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import useRequest from '../../hooks/useRequest';

const Signout = () => {
  const { updateCurrentUser } = useContext(UserContext);
  const history = useHistory();

  useRequest({
    url: '/api/users/signout',
    method: 'post',
    withEffect: true,
    onSuccess: () => {
      updateCurrentUser(null);
      history.push('/');
    }
  });

  return <div>Signing you out...</div>;
};

export default Signout;
