import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createToken, verifyToken } from '../utils/jwt';
import { findUser } from '../data/mockUsers';

const TOKEN_STORAGE_KEY = 'exp131_jwt_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('checking'); // checking | authenticated | unauthenticated
  const [lastError, setLastError] = useState(null);

  // Restore session from localStorage on load (this is what makes the
  // architecture *stateless* on the server, but persistent on the client).
  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (!stored) {
        setStatus('unauthenticated');
        return;
      }
      const result = await verifyToken(stored);
      if (result.valid) {
        setToken(stored);
        setUser(result.payload);
        setStatus('authenticated');
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setStatus('unauthenticated');
      }
    })();
  }, []);

  const login = useCallback(async (username, password) => {
    setLastError(null);
    const matched = findUser(username, password);
    if (!matched) {
      setLastError('Invalid username or password.');
      return { ok: false, error: 'Invalid username or password.' };
    }

    const newToken = await createToken({
      sub: matched.id,
      username: matched.username,
      name: matched.name,
      role: matched.role,
    });

    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    const decoded = await verifyToken(newToken);

    setToken(newToken);
    setUser(decoded.payload);
    setStatus('authenticated');
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  /**
   * Simulates attaching the token to an outgoing API request, e.g.:
   *   fetch('/api/resource', { headers: authHeader() })
   * This models step 5 of the conceptual flow: "Token is sent with each request".
   */
  const authHeader = useCallback(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const value = {
    token,
    user,
    status,
    isAuthenticated: status === 'authenticated',
    lastError,
    login,
    logout,
    authHeader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
