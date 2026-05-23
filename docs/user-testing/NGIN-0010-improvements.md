# NGIN-0010 — Improvements from User Feedback

Changes applied to `/signup.html` based on documented session findings.

## F1 — Visible password requirements (P1, P2, P5)

**Before:** Requirements shown only after failed submit.

**After:** Persistent requirements panel with live checkmarks as each rule is met (`req-length`, `req-upper`, `req-lower`, `req-number`).

## F2 — Prominent submit button (P2, P3)

**Before:** Button styled similarly to secondary actions.

**After:** Full-width primary CTA at 48px min height, bold label, high-contrast `#ff6b35` background with hover and focus-visible states.

## F3 — Inline email validation (P2, P4)

**Before:** Validation on submit with generic message.

**After:** Blur validation with specific copy: “Enter a valid email address (e.g. you@example.com).”

## F4 — Terms checkbox usability (P1, P3)

**Before:** Small checkbox; label text not associated for toggling.

**After:** Flex layout with 20px checkbox, full label `for="terms"` association, 44px+ touch-friendly spacing.

## F5 — Mobile spacing (P3, P5)

**Before:** Tight padding on small screens.

**After:** `@media (max-width: 480px)` increases field spacing and card padding; 16px base font on inputs to prevent iOS zoom.

## F6 — Password visibility toggle (P2, P5)

**Before:** Password fields always masked.

**After:** Show/Hide buttons on password and confirm fields with updated `aria-label`.

## F7 — Accessible error states (P4)

**Before:** Errors displayed without input association.

**After:** `aria-describedby` on inputs, `aria-invalid` toggled on validation, `role="alert"` on error text.

## F8 — Terms links open in new tab (P3)

**Before:** Terms opened in same window (prototype).

**After:** `target="_blank"` with `rel="noopener noreferrer"` on Terms and Privacy links.

## Verification

Manual checks performed on improved page:

- [x] Password requirements update while typing
- [x] Invalid email shows inline error on blur
- [x] Mismatched passwords show field-level error
- [x] Terms unchecked blocks submit with message
- [x] Show/Hide toggles work on both password fields
- [x] Layout readable at 375px viewport width
