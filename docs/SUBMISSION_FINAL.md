# AWS Student Builder Challenge: entry text (ready to paste)

Live site: https://main.dieyl2q306xr5.amplifyapp.com
GitHub: https://github.com/Z15-N/gia-portfolio

---

## Project title
Gia Bach Nguyen: a portfolio with a bee that quizzes you

## Short description (one or two lines)
A one-page portfolio for a first-year AI student and maths tutor, hosted on AWS Amplify. The creative feature is Buzz, a bee chatbot that answers questions about me and runs a three-question maths quiz.

## About the project
I'm a first-year Bachelor of Artificial Intelligence student at UTS in Sydney and a maths tutor. I wanted a portfolio that shows how I think rather than just listing things, so the site has three core sections (About me, Tech superpowers, Projects and achievements) plus a contact band, and it is written in plain language with real numbers: SAT Math 790, two Australian Mathematics Competition first prizes coached, 615 blocks in the first version of my chatbot.

The site is static HTML, CSS and JavaScript with no framework and no build step. It uses one warm colour theme with light and dark modes that follow the visitor's system setting, inline SVG icons, a hexagon portrait, and a honeycomb texture used once. The sections deliberately differ from each other: an asymmetric hero, a stats band with counting numbers, an editorial About column, a bento skills grid where Mathematics leads, an index-style project list, and a solid accent contact band.

## The creative feature: Buzz
Buzz is a bee chatbot in the bottom-right corner. A second bee with flapping wings flies across the top of the page, and clicking it opens the chat too. The hint is visible in the hero in a highlighted box: "the bee in the corner knows this page better than I do. Click it and try 'quiz me'".

Buzz answers questions about me using keyword matching (projects, maths, Battlecode, skills, contact), remembers a visitor's name for the session, tells maths jokes, offers quick-reply chips, and runs a three-question mental-arithmetic quiz with randomised numbers and a running score. It runs entirely in the browser with no API calls and no tracking, and it never blocks navigation: Escape or the close button dismisses it.

Buzz started life as a 615-block chatbot I built in mBlock, a Scratch-style block language, and published on mBlock Planet. Porting the same intents to JavaScript for this site was my first "real code" version of something I had only made with blocks.

## AWS services used
- AWS Amplify Hosting: hosts the static site with HTTPS and a CDN. I deployed by uploading a zip of the site through "Deploy without Git", then used "Deploy updates" for the redesign.
- AWS Budgets: a zero-spend budget with an email alert, so a free-tier project cannot surprise me.
- AWS Builder Center: the student profile this entry is submitted from.
(Region: Asia Pacific, Sydney.)

## What I learned and the challenges I hit
- Account setup was the hardest part. My first AWS sign-up failed with an account error, and the fix was patience: wait fifteen minutes, use a fresh browser with no extensions, and try again. I now know why the payment step exists (a one-dollar hold for identity checks, not a charge).
- Amplify Hosting needs no build configuration for a static site. The zip just has to have index.html at its root.
- Writing the chatbot in JavaScript after only blocks: keyword matching looks easy until "hi" matches "this". The intents are ordered and short greetings use exact matches.
- Testing at phone width before shipping. My first hint box wrapped badly because a flex container split the text around the bold words. Wrapping the text in one span fixed it.
- Scroll-reveal animations can skip elements if the visitor jumps with a nav link. I added a scroll sweep that reveals anything already above the fold.
- I built this with Claude Code as a pair programmer: I described each section and how Buzz should behave, reviewed the drafts, tested in the browser, and fixed what I found. The design decisions follow an open design doctrine (one theme, one accent, no emoji as icons, varied section layouts, motion kept short).

## Screenshots
1. docs/screenshot-desktop-buzz.jpg: desktop view with Buzz open mid-quiz.
2. docs/screenshot-mobile-hero.jpg: phone width, light mode.
3. (take this) Amplify console: the gia-portfolio app with the main branch deployed and the amplifyapp.com URL visible.
4. (take this) AWS Budgets: the zero-spend budget.

## Before you paste
- Upload the latest zip with Deploy updates, then open the live URL and check the bee flies across the top.
- Take screenshots 3 and 4 and attach them.
- Confirm the Battlecode, Cambridge Battlecode and 0.87 figures on the site are exactly right.
