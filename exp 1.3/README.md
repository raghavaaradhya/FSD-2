# Experiment 1.3 — Secure Authentication using JWT

A React + Vite implementation of the experiment manual "Experiment 1.3":
designing and implementing a stateless authentication system using
JSON Web Tokens (JWT), including token issuance, secure client-side
storage, attachment to requests, and decoding of user information.

## Aim

To design and implement a secure authentication system using JWT for
user login and session management.

## What's implemented

| Manual step | Where |
|---|---|
| Create login form UI | `src/pages/Login.jsx` |
| Validate user credentials (mock) | `src/data/mockUsers.js`, `AuthContext.login()` |
| Generate / simulate JWT token | `src/utils/jwt.js` → `createToken()` (real HMAC-SHA256 signing via the Web Crypto API, base64url-encoded header/payload/signature) |
| Store token (localStorage) | `AuthContext.jsx` (`localStorage`, key `exp131_jwt_token`) |
| Attach token to requests | `AuthContext.authHeader()`, used in `Dashboard.jsx`'s "Call a protected resource" demo (`Authorization: Bearer <token>`) |
| Decode token to extract user info | `src/utils/jwt.js` → `decodeToken()` / `verifyToken()`, displayed in `TokenInspector.jsx` |

Extra touches beyond the minimum brief, in the spirit of the objectives:

- **Real signature verification** — the app checks the HMAC signature
  and the `exp` (expiry) claim, not just that a token "exists". Tampered
  or expired tokens are rejected and the user is signed out.
- **Session restore** — reloading the page re-verifies the token from
  `localStorage` before treating the user as logged in (demonstrates
  the *stateless* part: no server-side session is ever consulted).
- **Live expiry countdown** on the dashboard; the session ends itself
  automatically when the token expires (default lifetime: 15 minutes).
- **Token anatomy view** — the signed-in dashboard visually decomposes
  the token into Header / Payload / Signature, color-coded, so the
  three-part structure from the theory section is directly visible.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Demo credentials

The login screen has one-click buttons for these, or enter manually:

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | Administrator |
| `student` | `student123` | Student |
| `faculty` | `faculty123` | Faculty |

## Project structure

```
src/
  utils/jwt.js            JWT create / decode / verify (HMAC-SHA256, Web Crypto API)
  data/mockUsers.js        Static mock "user database"
  context/AuthContext.jsx  Global auth state: login, logout, session restore, authHeader()
  components/
    ProtectedRoute.jsx      Route guard — redirects to /login if unauthenticated
    TokenInspector.jsx      Visualizes the decoded token's 3 segments
  pages/
    Login.jsx                Login form
    Dashboard.jsx             Protected page: user info, countdown, mock API call, token inspector
  App.jsx                    Routes
  main.jsx                   Entry point
  index.css                   Styling
```

## Important security note (part of the theory)

This project signs the JWT **in the browser** so the full mechanism can
be inspected without standing up a backend. That is fine for a learning
exercise but is **not how production systems work**:

- The signing secret must live only on a trusted server — never ship it
  to the client, since anyone can read client-side JavaScript.
- In production, prefer an **httpOnly, Secure, SameSite cookie** for
  token storage over `localStorage`, since `localStorage` is readable by
  any JavaScript running on the page (i.e. vulnerable to XSS-based theft).
  `localStorage` is used here only because it makes the token easy to
  inspect for the purposes of this experiment.
- Real backends also validate the signature and expiry on *every*
  protected request — the mock "Call a protected resource" button in the
  dashboard simulates that check, but there is no real server here to
  enforce it.

## Expected outcome

- User login system implemented ✅
- Token-based session handling achieved ✅
- Stateless authentication flow demonstrated ✅
