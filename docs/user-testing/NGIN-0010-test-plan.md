# NGIN-0010 — Signup Page User Testing Plan

## Objective

Validate usability of the enhanced signup page before release. Sessions focus on task completion, clarity of form guidance, and mobile usability.

## Scope

- Page under test: `/signup.html`
- Tasks: create an account using a provided test email and password
- Out of scope: backend account creation, email verification flow

## Participants

| ID   | Profile              | Device        | Session date |
|------|----------------------|---------------|--------------|
| P1   | Product manager      | Desktop       | 2026-05-20   |
| P2   | Frontend developer   | Desktop       | 2026-05-21   |
| P3   | New user (non-technical) | Mobile (iOS) | 2026-05-21   |
| P4   | QA engineer          | Desktop       | 2026-05-22   |
| P5   | Designer             | Mobile (Android) | 2026-05-22 |

## Session structure (30 minutes each)

1. **Intro (5 min)** — Explain think-aloud protocol; no leading questions.
2. **Task (15 min)** — “Create an account using email `test.user@example.com` and a password you choose.”
3. **Follow-up (7 min)** — Short interview on clarity, trust, and friction points.
4. **Wrap-up (3 min)** — Severity rating (1–5) for any issues encountered.

## Success metrics

- Task completion without moderator assistance
- Time to complete under 2 minutes
- No critical accessibility blockers (keyboard, screen reader labels)
- Severity 4–5 issues resolved before release

## Facilitator script

> “You’re signing up for a new Sunset Autopilot account. Please talk through what you’re thinking as you go. There are no wrong answers — we’re testing the page, not you.”

## Artifacts

- Session notes: `NGIN-0010-session-notes.md`
- Feedback summary: `NGIN-0010-feedback-summary.md`
- Improvements applied: `NGIN-0010-improvements.md`
