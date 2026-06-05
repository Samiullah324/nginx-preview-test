# nginx-preview-test

Tiny repo for testing Sunset Autopilot's per-PR preview deploy feature.

Single Docker container runs **nginx** on port 80 to serve static pages and proxy `/api/` requests to a **Node.js** auth API.

## Pages

| Path | Description |
|------|-------------|
| `/` | Landing page with build tag and preview deploy status |
| `/login.html` | Sign in |
| `/signup.html` | Create an account |
| `/forgot-password.html` | Request a password reset code |
| `/reset-password.html` | Reset password with a code |
| `/health` | Plain-text health check (`ok`) |

All auth pages include a floating chat widget for demo support interactions.

## Auth API

Base path: `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register with `username` and `password` (min 6 chars) |
| `POST` | `/login` | Authenticate and receive user details |
| `POST` | `/forgot-password` | Request a reset code (rate-limited) |
| `POST` | `/reset-password` | Reset password with `username`, `resetCode`, and `newPassword` |

User and reset-token data is stored in memory and resets on container restart.

## Run locally

```bash
docker build -t nginx-preview-test .
docker run --rm -p 8080:80 nginx-preview-test
```

Open http://localhost:8080 and confirm `/health` returns `ok`.

## Preview deploys

Adopt this repo in Sunset, enable auto deploy, and dispatch a ticket (for example, "change the title color to blue"). Cursor opens a PR and the preview deploys at:

```
https://nginx-preview-test-pr-{N}.preview.sunset.horizondigital.au
```

Merge or close the PR to tear down the preview.

## Project layout

```
├── index.html, login.html, signup.html, …   # Static pages
├── css/, js/                                  # Styles and client scripts
├── backend/                                   # Node.js auth API (used in Docker)
├── nginx.conf                                 # Reverse proxy config
├── Dockerfile                                 # nginx + Node.js container
└── app/                                       # FastAPI auth API (dev/tests only)
```

Run FastAPI tests with:

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest
```
