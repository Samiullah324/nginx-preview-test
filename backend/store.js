const crypto = require('crypto');

const users = new Map();

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function createUser(username, password) {
  const normalizedUsername = username.trim().toLowerCase();
  if (users.has(normalizedUsername)) {
    return { ok: false, error: 'Username is already taken.' };
  }

  const salt = crypto.randomBytes(16).toString('hex');
  users.set(normalizedUsername, {
    username: username.trim(),
    salt,
    passwordHash: hashPassword(password, salt),
  });

  return {
    ok: true,
    user: { username: username.trim() },
  };
}

function authenticateUser(username, password) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = users.get(normalizedUsername);

  if (!user) {
    return { ok: false, error: 'Invalid username or password.' };
  }

  const passwordHash = hashPassword(password, user.salt);
  const storedHash = Buffer.from(user.passwordHash, 'hex');
  const providedHash = Buffer.from(passwordHash, 'hex');

  if (
    storedHash.length !== providedHash.length ||
    !crypto.timingSafeEqual(storedHash, providedHash)
  ) {
    return { ok: false, error: 'Invalid username or password.' };
  }

  return {
    ok: true,
    user: { username: user.username },
  };
}

module.exports = {
  createUser,
  authenticateUser,
};
