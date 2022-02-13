// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    console.log("logged in")
    return (
    <Redirect to="/" />
  );
  }
  const handleDemoUser = (e) => {
    console.log("handle Demo user")
    e.preventDefault()
    setErrors([]);
    return dispatch(sessionActions.login({ credential:'Demo-lition',password:'password' }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  const handleSubmit = (e) => {
    console.log("sign in normally")
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='loginFormContainer'>
      <div className='formContainer'>
    <form className='loginForm' onSubmit={handleSubmit}>
      <ul className='ulErrors'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
        className='loginInput'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder='Username or Email'
        />
      </label>
      <label>
        Password
        <input className='loginInput'
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='loginSubmit' type="submit">Log In</button>
      <button className='loginSubmit' onClick={handleDemoUser}>Demo User</button>
    </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
