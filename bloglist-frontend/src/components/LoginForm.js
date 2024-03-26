import React from 'react';
import './LoginForm.css';  // Import custom CSS

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;