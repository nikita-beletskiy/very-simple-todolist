import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import useRequest from '../../hooks/useRequest';

const Signup = () => {
  const { updateCurrentUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const { request: signup, isPending } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: user => {
      updateCurrentUser(user);
      history.push('/');
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    signup();
  };

  return (
    <div className='login-wrapper'>
      <div className='user-form'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='user-form__input-group'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='text'
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='user-form__input-group'>
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type='password'
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className={isPending ? 'disabled' : undefined}
            disabled={isPending}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
