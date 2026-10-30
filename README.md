# Gia Bach Nguyen — portfolio

Personal portfolio site for the AWS Student Builder Challenge ("Build Your Tech Superpower", Oct–Nov 2026).

* `index.html` — About, Tech superpowers, Projects & achievements, Contact.
* `styles.css` — light/dark theme via CSS variables, responsive down to phone width.
* `script.js` — **Buzz**, the interactive feature: a keyword chatbot about Gia with a three-question maths quiz. The hint is in the hero section.

Static site, no build step. Hosted on **AWS Amplify Hosting**.

## Run locally
Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```

## Deploy (Amplify Hosting)
Run `sh tools/package.sh` to build `../gia-portfolio-amplify.zip` (asset links get a version stamp so browsers never serve a stale file), then Amplify → gia-portfolio → main → Deploy updates → drop the zip.
