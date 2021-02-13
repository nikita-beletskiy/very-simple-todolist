import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import useRequest from '../hooks/useRequest';
import '../styles/UserForm.css';

const Signup = () => {
  const { updateCurrentUser } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const { request, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: user => {
      updateCurrentUser(user);
      history.push('/');
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    request();
  };

  const emailError =
    errors &&
    errors
      .filter(error => error.field === 'email')
      .map(error => (
        <div className='error' key={error.message}>
          {error.message}
        </div>
      ));
  const passwordError =
    errors &&
    errors
      .filter(error => error.field === 'password')
      .map(error => (
        <div className='error' key={error.message}>
          {error.message}
        </div>
      ));

  return (
    <div className='user-form'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            required
            onChange={e => setEmail(e.target.value)}
          />
          {emailError}
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError}
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
