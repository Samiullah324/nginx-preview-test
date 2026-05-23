# Signup Page Design Mockups — NGIN-0006

Initial design mockups for the enhanced signup page. These provide a visual reference for stakeholders and guide the development process.

## Ticket

| Field | Value |
|-------|-------|
| **ID** | NGIN-0006 |
| **Title** | Create initial design mockups for signup page |
| **Tags** | ui, ux |

## Acceptance Criteria

- [x] Mockups are created using design tools
- [x] Design aligns with existing UI standards
- [x] Mockups are shared with stakeholders for feedback

## Design Standards

These mockups follow the existing Sunset Autopilot UI palette and typography from the landing page:

| Token | Value | Usage |
|-------|-------|--------|
| Background | `#fffaf0` | Page background (warm off-white) |
| Accent | `#ff6b35` | Headings, buttons, links, focus states |
| Text | `#333` | Primary body text |
| Secondary | `#666` / `#888` | Supporting text and hints |
| Surface | `#ffffff` | Card and form backgrounds |
| Code / muted | `#f0f0f0` | Dividers, inactive states |
| Font | `system-ui` | All text |

## Mockup Assets

### Static images (design tool exports)

| File | Description |
|------|-------------|
| [signup-desktop.png](./signup-desktop.png) | Desktop layout — centered card, social login options |
| [signup-mobile.png](./signup-mobile.png) | Mobile layout — single-column, touch-friendly spacing |

### Interactive HTML prototype

A clickable HTML/CSS prototype is available at `/signup/` on preview deploys. It demonstrates:

- Form field layout with labels and validation hints
- Password strength indicator (visual only)
- Primary CTA and social login buttons
- Responsive behaviour at mobile breakpoints
- Focus and hover states

## UX Improvements (vs. basic form)

1. **Clear hierarchy** — Logo, headline, and supporting copy establish context before the form.
2. **Accessible labels** — Every input has an associated label; placeholders are supplementary.
3. **Inline guidance** — Password requirements shown before submission.
4. **Social login** — Reduces friction for users with existing Google/GitHub accounts.
5. **Sign-in path** — Existing users are directed to login without hunting for a link.
6. **Responsive layout** — Card adapts to mobile with adjusted padding and typography.

## Stakeholder Feedback

Please review the mockups and share feedback on:

1. **Visual design** — Colors, spacing, typography, and overall feel
2. **Form fields** — Are the required fields correct? Any missing fields?
3. **Social login** — Which providers should be supported?
4. **Copy** — Headlines, button labels, and helper text
5. **Mobile experience** — Layout and touch targets on small screens

### How to provide feedback

- Comment on the pull request for this ticket
- Or reply in the NGIN-0006 ticket thread

### Preview URL

Once deployed, view the interactive mockup at:

```
https://sunset-autopilot-test-pr-{N}.preview.sunset.horizondigital.au/signup/
```

Replace `{N}` with the PR number.

## Next Steps (post-approval)

1. Incorporate stakeholder feedback into revised mockups
2. Break down implementation into development tickets
3. Build functional signup with backend integration
