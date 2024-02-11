import React, { useState, useEffect } from 'react';
import Video from './galaxy.mp4';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    setErrMessage('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="mainbg">
      <video src={Video} autoPlay loop muted />
      <div className="overlay"></div>
      <section className="content">
        <p className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Log In</button>
        </form>
        <p>
          <a href="home">Continue as Guest</a>
        </p>
      </section>
    </div>
  )
}

export default Login;