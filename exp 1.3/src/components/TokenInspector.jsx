import { decodeToken } from '../utils/jwt';

/**
 * Renders the raw token split into its three color-coded segments plus
 * the decoded Header/Payload, making the "Header.Payload.Signature"
 * structure from the theory section tangible.
 */
export default function TokenInspector({ token }) {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  const [h, p, s] = token.split('.');

  return (
    <div className="inspector">
      <div className="inspector-raw" aria-label="Raw JWT">
        <span className="seg seg-header">{h}</span>
        <span className="seg-dot">.</span>
        <span className="seg seg-payload">{p}</span>
        <span className="seg-dot">.</span>
        <span className="seg seg-signature">{s}</span>
      </div>

      <div className="inspector-grid">
        <div className="inspector-block">
          <div className="inspector-block-label seg-header-label">HEADER</div>
          <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
        </div>
        <div className="inspector-block">
          <div className="inspector-block-label seg-payload-label">PAYLOAD</div>
          <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
        </div>
        <div className="inspector-block">
          <div className="inspector-block-label seg-signature-label">SIGNATURE</div>
          <pre className="signature-note">
HMACSHA256(
  base64url(header) + "." + base64url(payload),
  SECRET_KEY
)
          </pre>
        </div>
      </div>
    </div>
  );
}
