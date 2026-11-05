# Gia Portfolio Constitution

## Core Principles

### I. Static and dependency-free
The site is plain HTML, CSS and JavaScript: three files plus images, no framework, no build step, no package manager. Anything that needs a server, a key or a third-party script is out of scope unless a spec says otherwise and names the cost.

### II. One theme, consumed everywhere
All colour, radius, motion timing and spacing come from the CSS variables on `:root` in `styles.css`, with the dark theme defined once under `prefers-color-scheme: dark` and `[data-theme="dark"]`. No section introduces its own colour, font or radius. Every change is checked in both light and dark.

### III. Honest content (NON-NEGOTIABLE)
Every claim on the page matches Gia's real profile: no invented results, no inflated numbers, no placement claimed until he confirms it. Unknown facts are left out, never guessed. The portrait is an illustration, never a fake photo.

### IV. Design doctrine
Follows the UX kit doctrine already applied: real inline SVG icons (never emoji), one accent colour, section layouts that vary (hero, band, editorial, bento, cards, band), display type on a wide measure, body text at 60 to 75 characters, hairline borders over shadows, motion limited to short fades, hover lifts and the bee, all respecting `prefers-reduced-motion`.

### V. Works everywhere it will be judged
Checked at 1800px, 1024px and 375px wide, light and dark, before any zip is built: no horizontal overflow, no console errors, no missing files, nav anchors land correctly, Buzz answers the standard test questions. Text over the honeycomb must stay readable.

### VI. Buzz stays in the browser
The chatbot runs entirely client side: no API calls, no tracking, no stored data. It is rule based (scored topics, normalised spellings, follow-ups). Any upgrade to a hosted model is a separate spec with cost and rate limiting addressed.

## Constraints

- Hosted on AWS Amplify Hosting (app gia-portfolio, Sydney region) by zip upload; a zero-spend AWS Budget alarm exists.
- Builds come from `tools/package.sh`, which stamps every asset link with a version so browsers never serve a stale file after a deploy.
- Public GitHub repo Z15-N/gia-portfolio; the AWS Student Builder Challenge entry text lives in `docs/SUBMISSION_FINAL.md` and must stay true to the live site.
- Personal data on the page is limited to name, city, LinkedIn and study details. No email, phone, address or date of birth.

## Development Workflow

1. Every feature starts with `/speckit-specify`, then `/speckit-plan` and `/speckit-tasks`, before any code.
2. Implement, then run the checks in Principle V in the browser, not by reading the source.
3. Build the zip with `tools/package.sh`, commit with a message that says what changed and why, push to main, and hand Gia the zip. He deploys; nothing is deployed on his behalf.
4. A visual change Gia rejects gets a written reason in the next spec, so the same pass is not repeated.

## Governance

This constitution outranks ad-hoc requests in chat: if a request conflicts with Principle III or VI, say so before building. Amendments are a commit to this file with the version bumped and a one-line reason in the commit message.

**Version**: 1.0.0 | **Ratified**: 2026-11-05 | **Last Amended**: 2026-11-05
