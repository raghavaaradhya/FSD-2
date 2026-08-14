/**
 * mockUsers.js
 * -----------------------------------------------------------------------
 * Static, in-memory user "database" used to validate credentials during
 * login (step 2 of the conceptual flow: "Server validates user").
 *
 * In a real system this lookup — and the password check — happens on a
 * backend against hashed passwords (e.g. bcrypt). Here it is mocked so
 * the front-end flow can be demonstrated without a server.
 * -----------------------------------------------------------------------
 */
export const mockUsers = [
  { id: 'u001', username: 'admin', password: 'admin123', name: 'Aditi Rao', role: 'Administrator' },
  { id: 'u002', username: 'student', password: 'student123', name: 'Rohan Mehta', role: 'Student' },
  { id: 'u003', username: 'faculty', password: 'faculty123', name: 'Dr. Kavita Sharma', role: 'Faculty' },
];

export function findUser(username, password) {
  return mockUsers.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );
}
