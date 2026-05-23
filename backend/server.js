const http = require('http');
const { createUser, authenticateUser } = require('./store');

const PORT = process.env.PORT || 3000;
const MAX_BODY_BYTES = 4096;

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk;
      if (rawBody.length > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', reject);
  });
}

function validateCredentials(body) {
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username) {
    return { ok: false, error: 'Username is required.' };
  }

  if (!password) {
    return { ok: false, error: 'Password is required.' };
  }

  if (username.length > 64) {
    return { ok: false, error: 'Username must be 64 characters or fewer.' };
  }

  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' };
  }

  return { ok: true, username, password };
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed.' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message || 'Invalid request body.' });
    return;
  }

  const credentials = validateCredentials(body);
  if (!credentials.ok) {
    sendJson(res, 400, { error: credentials.error });
    return;
  }

  if (req.url === '/api/auth/signup') {
    const result = createUser(credentials.username, credentials.password);
    if (!result.ok) {
      sendJson(res, 409, { error: result.error });
      return;
    }

    sendJson(res, 201, {
      message: 'Account created successfully.',
      user: result.user,
    });
    return;
  }

  if (req.url === '/api/auth/login') {
    const result = authenticateUser(credentials.username, credentials.password);
    if (!result.ok) {
      sendJson(res, 401, { error: result.error });
      return;
    }

    sendJson(res, 200, {
      message: 'Login successful.',
      user: result.user,
    });
    return;
  }

  sendJson(res, 404, { error: 'Not found.' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Auth API listening on http://127.0.0.1:${PORT}`);
});
