/**
 * jwt.js
 * -----------------------------------------------------------------------
 * A small, dependency-free JWT (JSON Web Token) implementation that runs
 * entirely in the browser using the native Web Crypto API (HMAC-SHA256).
 *
 * This exists to make the three JWT parts concrete for the experiment:
 *
 *      xxxxx.yyyyy.zzzzz
 *      Header  .  Payload  .  Signature
 *
 * IMPORTANT SECURITY NOTE (read this — it's part of the experiment):
 * In a real production system, the token must be SIGNED ON THE SERVER,
 * where the secret key stays private. Here, because this project has no
 * backend, the "server" step is simulated on the client so the signing/
 * verification mechanics can be inspected and demonstrated end-to-end.
 * Never ship a real app that signs auth tokens in the browser.
 * -----------------------------------------------------------------------
 */

// Demo-only secret. In production this lives ONLY on the server.
const SECRET_KEY = 'experiment-1.3-super-secret-key';
const ALGORITHM = 'HS256';

/* ----------------------------- base64url ------------------------------ */

function base64urlEncode(bytes) {
  let binary = '';
  const view = new Uint8Array(bytes);
  for (let i = 0; i < view.length; i++) binary += String.fromCharCode(view[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlEncodeString(str) {
  return base64urlEncode(new TextEncoder().encode(str));
}

function base64urlDecodeToString(b64url) {
  let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/* --------------------------- HMAC-SHA256 ------------------------------ */

async function getHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function hmacSign(data, secret) {
  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return base64urlEncode(signature);
}

async function hmacVerify(data, signature, secret) {
  const key = await getHmacKey(secret);
  let sigBytes;
  try {
    let b64 = signature.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const binary = atob(b64);
    sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) sigBytes[i] = binary.charCodeAt(i);
  } catch {
    return false;
  }
  return crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data));
}

/* ------------------------------- API ----------------------------------- */

/**
 * Create (sign) a JWT from a payload object.
 * @param {object} payload   claims to embed (sub, name, role, ...)
 * @param {number} expiresInSeconds  token lifetime, default 15 min
 */
export async function createToken(payload, expiresInSeconds = 15 * 60) {
  const header = { alg: ALGORITHM, typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now, // issued-at
    exp: now + expiresInSeconds, // expiry
  };

  const encodedHeader = base64urlEncodeString(JSON.stringify(header));
  const encodedPayload = base64urlEncodeString(JSON.stringify(fullPayload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = await hmacSign(signingInput, SECRET_KEY);

  return `${signingInput}.${signature}`;
}

/**
 * Decode a JWT WITHOUT verifying the signature.
 * Mirrors what any client (or attacker) can trivially do — decoding is not
 * the same as trusting. Useful for reading claims for UI purposes only.
 */
export function decodeToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(base64urlDecodeToString(parts[0]));
    const payload = JSON.parse(base64urlDecodeToString(parts[1]));
    return { header, payload, signature: parts[2] };
  } catch {
    return null;
  }
}

/**
 * Verify a JWT's signature and expiry. This is the check that actually
 * matters for trusting the token's contents.
 * @returns {Promise<{ valid: boolean, expired: boolean, payload: object|null, reason?: string }>}
 */
export async function verifyToken(token) {
  const decoded = decodeToken(token);
  if (!decoded) return { valid: false, expired: false, payload: null, reason: 'Malformed token' };

  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signatureOk = await hmacVerify(signingInput, signature, SECRET_KEY);
  if (!signatureOk) {
    return { valid: false, expired: false, payload: null, reason: 'Signature mismatch — token was altered' };
  }

  const now = Math.floor(Date.now() / 1000);
  const expired = typeof decoded.payload.exp === 'number' && now >= decoded.payload.exp;

  if (expired) {
    return { valid: false, expired: true, payload: decoded.payload, reason: 'Token expired' };
  }

  return { valid: true, expired: false, payload: decoded.payload };
}

export function getSecondsRemaining(payload) {
  if (!payload || typeof payload.exp !== 'number') return 0;
  return Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
}
