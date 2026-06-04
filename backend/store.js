const crypto = require('crypto');

const users = new Map();

/*
 * NOTE: Reset tokens are stored in-memory and will be lost on server restart.
 * For production use, implement persistent storage (e.g., database, Redis)
 * to ensure reset tokens survive server restarts and support horizontal scaling.
 */
const resetTokens = new Map();

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

function createResetToken(username) {
  const normalizedUsername = username.trim().toLowerCase();
  const user = users.get(normalizedUsername);

  if (!user) {
    return { ok: false };
  }

  const resetCode = crypto.randomBytes(16).toString('hex').toUpperCase();
  const expiresAt = Date.now() + 15 * 60 * 1000;

  resetTokens.set(normalizedUsername, {
    code: resetCode,
    expiresAt,
    attempts: 0,
  });

  /*
   * NOTE: In production, send resetCode via email here using an email service.
   * Example: await emailService.send(user.email, 'Password Reset', `Your code: ${resetCode}`);
   * The reset code should NEVER be returned to the client or logged.
   */

  return { ok: true };
}

const MAX_RESET_ATTEMPTS = 5;

function verifyResetToken(username, resetCode) {
  const normalizedUsername = username.trim().toLowerCase();
  const tokenData = resetTokens.get(normalizedUsername);

  if (!tokenData) {
    return { ok: false, error: 'Invalid or expired reset code.' };
  }

  if (Date.now() > tokenData.expiresAt) {
    resetTokens.delete(normalizedUsername);
    return { ok: false, error: 'Reset code has expired. Please request a new one.' };
  }

  if (tokenData.attempts >= MAX_RESET_ATTEMPTS) {
    resetTokens.delete(normalizedUsername);
    return { ok: false, error: 'Too many failed attempts. Please request a new reset code.' };
  }

  if (tokenData.code !== resetCode.trim().toUpperCase()) {
    tokenData.attempts++;
    return { ok: false, error: 'Invalid reset code.' };
  }

  return { ok: true };
}

function resetUserPassword(username, resetCode, newPassword) {
  const normalizedUsername = username.trim().toLowerCase();

  const verification = verifyResetToken(username, resetCode);
  if (!verification.ok) {
    return verification;
  }

  const user = users.get(normalizedUsername);
  if (!user) {
    return { ok: false, error: 'User not found.' };
  }

  const salt = crypto.randomBytes(16).toString('hex');
  user.salt = salt;
  user.passwordHash = hashPassword(newPassword, salt);

  resetTokens.delete(normalizedUsername);

  return {
    ok: true,
    user: { username: user.username },
  };
}

module.exports = {
  createUser,
  authenticateUser,
  createResetToken,
  resetUserPassword,
};
