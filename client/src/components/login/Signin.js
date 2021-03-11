import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorsContext } from '../../contexts/ErrorsContext';
import { UserContext } from '../../contexts/UserContext';
import useRequest from '../../hooks/useRequest';
import '../../styles/UserForm.css';

const Signin = () => {
  const { updateCurrentUser } = useContext(UserContext);
  const { errors } = useContext(ErrorsContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const { request: signin, isPending } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: user => {
      updateCurrentUser(user);
      history.push('/');
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    signin();
  };

  return (
    <div className='user-form'>
      {errors}
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' disabled={isPending}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
