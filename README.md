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
Amplify console → *Deploy without Git* → upload a zip of this folder (`index.html` at the root), or connect this GitHub repo.
