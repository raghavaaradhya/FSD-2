import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockUsers';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (isAuthenticated) {
    const redirectTo = location.state?.from || '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  function validate() {
    const next = {};
    if (!username.trim()) next.username = 'Username is required.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;

    setSubmitting(true);
    const result = await login(username, password);
    setSubmitting(false);

    if (result.ok) {
      navigate('/dashboard', { replace: true });
    } else {
      setFormError(result.error);
    }
  }

  function fillDemo(u) {
    setUsername(u.username);
    setPassword(u.password);
    setErrors({});
    setFormError('');
  }

  return (
    <div className="screen-center">
      <div className="panel">
        <div className="panel-eyebrow">EXPERIMENT 1.3</div>
        <h1 className="panel-title">Sign in</h1>
        <p className="panel-subtitle">
          Authenticate to receive a signed JSON Web Token for this session.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? 'invalid' : ''}
              placeholder="e.g. admin"
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'invalid' : ''}
              placeholder="••••••••"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          {formError && <div className="form-error">{formError}</div>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Verifying…' : 'Sign in & issue token'}
          </button>
        </form>

        <div className="demo-box">
          <div className="demo-box-label">Demo credentials</div>
          <div className="demo-users">
            {mockUsers.map((u) => (
              <button key={u.id} type="button" className="demo-chip" onClick={() => fillDemo(u)}>
                <span className="demo-chip-role">{u.role}</span>
                <span className="demo-chip-user">{u.username} / {u.password}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
