const AUTH_API_BASE = '/api/auth';

async function parseAuthResponse(response) {
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || 'Request failed. Please try again.');
  }

  return data;
}

async function signUp(username, password) {
  const response = await fetch(`${AUTH_API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return parseAuthResponse(response);
}

async function logIn(username, password) {
  const response = await fetch(`${AUTH_API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return parseAuthResponse(response);
}

async function requestPasswordReset(username) {
  const response = await fetch(`${AUTH_API_BASE}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });

  return parseAuthResponse(response);
}

async function resetPassword(username, resetCode, newPassword) {
  const response = await fetch(`${AUTH_API_BASE}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, resetCode, newPassword }),
  });

  return parseAuthResponse(response);
}
