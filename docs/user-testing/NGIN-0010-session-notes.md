# NGIN-0010 — User Testing Session Notes

Raw observations from five moderated signup sessions (May 20–22, 2026).

---

## Session P1 — Product manager (Desktop)

**Completed:** Yes (2:40)

| Time | Observation |
|------|-------------|
| 0:15 | Scrolled past heading; started typing email immediately |
| 0:45 | Submitted with weak password; surprised by error with no prior guidance |
| 1:20 | Asked “where are the password rules?” before second attempt |
| 2:10 | Missed terms checkbox on first pass; clicked submit twice |
| 2:40 | Completed after moderator hint on checkbox |

**Quote:** “I didn’t know the password rules until it failed.”

**Severity:** Password requirements hidden — **5**

---

## Session P2 — Frontend developer (Desktop)

**Completed:** Yes (1:55)

| Time | Observation |
|------|-------------|
| 0:20 | Noticed low-contrast submit button; hesitated |
| 0:50 | Typed invalid email `test@`; generic error on submit only |
| 1:10 | Wanted show/hide password for confirmation field |
| 1:55 | Completed successfully |

**Quote:** “The create button doesn’t stand out enough — I almost thought the form auto-submitted.”

**Severity:** Submit button contrast — **4**

---

## Session P3 — New user, non-technical (Mobile iOS)

**Completed:** Yes (3:15)

| Time | Observation |
|------|-------------|
| 0:30 | Pinch-zoomed; fields felt cramped |
| 1:00 | Tapped label text for terms; checkbox did not toggle (small hit target) |
| 1:45 | Opened Terms link; lost form context (same tab in prototype) |
| 2:30 | Password mismatch; error appeared but field not highlighted |
| 3:15 | Completed with assistance on terms checkbox |

**Quote:** “On my phone everything is squished and I’m not sure what I did wrong.”

**Severity:** Mobile spacing + terms interaction — **4**

---

## Session P4 — QA engineer (Desktop)

**Completed:** Yes (1:30)

| Time | Observation |
|------|-------------|
| 0:25 | Tabbed through form; focus ring visible |
| 0:55 | Noted missing `aria-invalid` on errored fields |
| 1:10 | Email validation only on submit in prototype |
| 1:30 | Completed; filed accessibility notes |

**Quote:** “Errors should be tied to inputs for screen readers.”

**Severity:** Accessibility / inline validation — **3**

---

## Session P5 — Designer (Mobile Android)

**Completed:** Yes (2:05)

| Time | Observation |
|------|-------------|
| 0:40 | Liked card layout and brand color on heading |
| 1:00 | Password requirements list requested upfront (before typing) |
| 1:30 | Confirm password needed visibility toggle |
| 2:05 | Completed without blockers |

**Quote:** “Show the requirements before I fail — green checkmarks would help.”

**Severity:** Proactive password guidance — **4**

---

## Cross-session themes

1. Password rules discovered too late (4/5 participants)
2. Submit button insufficient emphasis (2/5)
3. Email validation feedback delayed (3/5)
4. Terms checkbox hard to use on mobile (2/5)
5. Password visibility toggles expected (3/5)
6. Error states need stronger field association (2/5)
