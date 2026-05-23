# sunset-autopilot-test

Tiny repo for testing Sunset Autopilot's per-PR preview deploy feature.

Single container running a FastAPI backend on port 80 with a static landing page and `/health` endpoint.

## Auth API

- `POST /api/auth/register` — register a user (`email`, `password` min 8 chars)
- `POST /api/auth/login` — authenticate and receive a JWT access token

Set `JWT_SECRET` in production. Optional: `DATABASE_URL` (defaults to SQLite) and `JWT_EXPIRE_MINUTES`.

Adopt this in Sunset, flip auto_deploy_enabled, dispatch a ticket like "change the title color to blue" — Cursor will open a PR and the preview will deploy at:

  https://sunset-autopilot-test-pr-{N}.preview.sunset.horizondigital.au

Merge or close the PR to tear down.
