# sunset-autopilot-test

Tiny repo for testing Sunset Autopilot's per-PR preview deploy feature.

Single container, nginx serving a static page on port 80 with /health endpoint.

Adopt this in Sunset, flip auto_deploy_enabled, dispatch a ticket like "change the title color to blue" — Cursor will open a PR and the preview will deploy at:

  https://sunset-autopilot-test-pr-{N}.preview.sunset.horizondigital.au

Merge or close the PR to tear down.
