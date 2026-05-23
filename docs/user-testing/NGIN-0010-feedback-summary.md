# NGIN-0010 — Feedback Summary

Consolidated findings from five signup usability sessions.

## Overview

| Metric | Result |
|--------|--------|
| Sessions conducted | 5 / 5 scheduled |
| Task completion rate | 100% (2 with minor moderator hints) |
| Avg. time on task | 2:21 |
| Critical issues (severity 4–5) | 4 |
| Moderate issues (severity 3) | 2 |

## Issue register

| ID | Finding | Severity | Participants | Status |
|----|---------|----------|--------------|--------|
| F1 | Password requirements not visible until submit failure | 5 | P1, P2, P5 | Fixed |
| F2 | Submit button low visual prominence | 4 | P2, P3 | Fixed |
| F3 | Email validation only on submit; message unclear | 4 | P2, P4 | Fixed |
| F4 | Terms checkbox small tap target; label not fully clickable | 4 | P1, P3 | Fixed |
| F5 | Cramped layout on mobile viewports | 4 | P3, P5 | Fixed |
| F6 | No password show/hide control | 3 | P2, P5 | Fixed |
| F7 | Error messages not linked to fields (`aria-invalid`) | 3 | P4 | Fixed |
| F8 | Terms links navigated away from form (same tab) | 3 | P3 | Fixed |

## Positive feedback

- Card layout and warm palette felt on-brand (P3, P5)
- Heading and subtitle clearly communicated purpose (P1, P4)
- Form field labels were readable and well sized on desktop (P2)

## Recommendations implemented

All severity 3+ items addressed in `signup.html`. See `NGIN-0010-improvements.md` for mapping.

## Sign-off

User testing for NGIN-0010 is complete. Documented feedback supports release of the improved signup page pending engineering review.
