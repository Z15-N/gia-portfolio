# Submission write-up (draft) — AWS Student Builder Challenge

**Live URL:** https://main.dieyl2q306xr5.amplifyapp.com
**GitHub:** https://github.com/Z15-N/gia-portfolio

## What I built
A one-page portfolio: About Me, Tech Superpowers (skills), Projects & Achievements, Contact. Plain HTML, CSS and
JavaScript with no framework and no build step, so it loads fast and works on a phone. Light and dark themes follow
the visitor's system setting.

## The creative feature: Buzz
Buzz is a bee chatbot that lives in the bottom-right corner, and a second bee flies across the hero (click it and the
chat opens too). The visible hint sits in the hero in a highlighted box: "the bee in the corner knows this page better
than I do. Click it and try 'quiz me'". Buzz answers questions about me with keyword matching, remembers a visitor's
name for the session, tells maths jokes, offers quick-reply chips (projects, quiz me, joke, help), and runs a
three-question mental-arithmetic quiz with randomised numbers and a score. It runs entirely in the browser: no API
calls, no tracking, and it never blocks navigation (Escape or the close button dismisses it).

Why a bee: Buzz started as a 615-block chatbot I built in mBlock (a Scratch-style block language) and published on
mBlock Planet. Porting the same intents to JavaScript for this site was the first "real code" version of something I
had only made with blocks.

## Design notes
One warm theme (CSS variables, light and dark), one accent colour, inline SVG icons, a hexagon portrait and a
honeycomb texture used once. Sections deliberately vary: asymmetric hero, a stats band with counting numbers, an
editorial About with a drop cap, a bento skills grid where Mathematics leads, an index-style project list, and a
solid accent contact band. Motion is limited to short fades on scroll, hover lifts, and the bee's wings.

## AWS services used
- **AWS Amplify Hosting** — hosts the static site, HTTPS and CDN included. Deployed from the GitHub repo
  (or via manual zip upload — say which one you used).
- **AWS Budgets** — a $5 monthly budget with an email alert, so a free-tier project can't surprise me.
(Add any other services you touched, e.g. Route 53 if you add a custom domain.)

## What I learned / challenges
- (fill after deploying) e.g. how Amplify builds a static site without a build file; the difference between the
  default amplifyapp.com URL and a custom domain; where to find the deploy logs when a page 404s.
- Writing the chatbot in JavaScript after only blocks: keyword matching looks easy until "hi" matches "this" — the
  intents are ordered and the greeting check uses exact matches for short words.
- Testing on a phone width before shipping: my hint box wrapped badly because a flex container split the text around
  the bold words. Fixed by wrapping the text in a single span.
- Built with Claude Code as a pair programmer: I described each section and the chatbot's behaviour, reviewed the
  drafts, and tested in the browser.

## Screenshots
- docs/screenshot-desktop-buzz.jpg — desktop, Buzz open mid-quiz
- docs/screenshot-mobile-hero.jpg — phone width, light mode
- (add) Amplify console showing the deployed app and its URL
- (add) AWS Budgets alert page
