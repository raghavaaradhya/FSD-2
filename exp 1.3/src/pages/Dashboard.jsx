import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSecondsRemaining } from '../utils/jwt';
import TokenInspector from '../components/TokenInspector';

/**
 * Simulates an authenticated call to a protected API endpoint, attaching
 * the JWT via the Authorization header (step 5 of the conceptual flow).
 */
function callProtectedResource(authHeader) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hasAuth = Boolean(authHeader().Authorization);
      resolve({
        status: hasAuth ? 200 : 401,
        body: hasAuth
          ? { message: 'Access granted to protected resource.', data: [12, 45, 78, 23] }
          : { message: 'Unauthorized.' },
      });
    }, 500);
  });
}

export default function Dashboard() {
  const { user, token, logout, authHeader } = useAuth();
  const [secondsLeft, setSecondsLeft] = useState(getSecondsRemaining(user));
  const [resourceLog, setResourceLog] = useState(null);
  const [loadingResource, setLoadingResource] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsRemaining(user));
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (secondsLeft === 0) {
      const t = setTimeout(logout, 300);
      return () => clearTimeout(t);
    }
  }, [secondsLeft, logout]);

  async function handleFetchResource() {
    setLoadingResource(true);
    const res = await callProtectedResource(authHeader);
    setResourceLog(res);
    setLoadingResource(false);
  }

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  const isLow = secondsLeft <= 60;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <div className="panel-eyebrow">EXPERIMENT 1.3</div>
          <h1 className="panel-title">Protected dashboard</h1>
        </div>
        <button className="btn-ghost" onClick={logout}>Log out</button>
      </header>

      <section className="card-row">
        <div className="card">
          <div className="card-label">Signed-in user</div>
          <div className="user-block">
            <div className="avatar" aria-hidden="true">{user?.name?.[0] ?? '?'}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-meta">@{user?.username} · {user?.role}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-label">Session expiry (client-side, from exp claim)</div>
          <div className={`countdown ${isLow ? 'countdown-low' : ''}`}>
            {minutes}:{seconds}
          </div>
          <div className="card-hint">Token auto-invalidates and logs out at 00:00</div>
        </div>
      </section>

      <section className="card">
        <div className="card-label">Call a protected resource</div>
        <p className="card-hint">
          Sends <code>Authorization: Bearer &lt;token&gt;</code> with the request, the way an API
          client attaches a JWT to every call in a stateless architecture.
        </p>
        <button className="btn-primary btn-inline" onClick={handleFetchResource} disabled={loadingResource}>
          {loadingResource ? 'Requesting…' : 'GET /api/protected-resource'}
        </button>
        {resourceLog && (
          <pre className={`response-log ${resourceLog.status === 200 ? 'ok' : 'err'}`}>
{`HTTP ${resourceLog.status}
${JSON.stringify(resourceLog.body, null, 2)}`}
          </pre>
        )}
      </section>

      <section className="card">
        <div className="card-label">Token anatomy — Header.Payload.Signature</div>
        <TokenInspector token={token} />
      </section>
    </div>
  );
}
