# Jumeoni 주머니

> **Your pocket Korean adult.** Snap any Korean bill, government notice, prescription, or contract — and AI tells you what it is, what to do, and by when.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-installable-c93636.svg)]()
[![Built with Gemini](https://img.shields.io/badge/built_with-Gemini-4285F4.svg)]()

Built for the **[2.7 million foreign residents](https://www.korea.net/NewsFocus/Society/view?articleId=275949) living in South Korea** who can survive daily life but get destroyed by paperwork. Translation is a solved problem; understanding what to *do* with a translated document isn't.

## What it does

You drop a Korean document — photo, screenshot, or PDF — into the app. Gemini's vision model identifies the document type, extracts deadlines and amounts, judges urgency, and returns a structured response:

- **What this is** — plain-English summary explaining what the document means *in context*, not just what it says
- **Key facts** — amounts, deadlines, reference numbers at a glance
- **What to do** — concrete actions, ordered by priority
- **Line by line** — the most confusing Korean phrases, explained
- **Legitimacy check** — is this real, or is it a scam?

Built as a Progressive Web App. Installable on any device. Zero data is stored on a server.

## Live demo

👉 **https://afa-farkhod.github.io/jumeoni/** 

The demo includes three sample documents you can try without any configuration:

- 📃 **Tax notice** — a real-format Seoul automobile tax bill
- 💊 **Prescription** — a pharmacy prescription with three medications
- 💬 **Landlord Kakao** — a screenshot of a typical landlord message

For your own documents, you'll be prompted to add an Gemini API key (stored only in your browser's localStorage).

## Tech stack

- **Vite** — build tool, ~1s rebuilds
- **Vanilla JS + CSS** — no framework overhead, ~25KB gzipped
- **vite-plugin-pwa** — service worker, manifest, installable
- **Gemini** — vision model for document understanding
- **GitHub Pages** — free static hosting
- **GitHub Actions** — CI/CD + tagged releases

No backend. No database. No tracking.

## Local development

```bash
git clone https://github.com/afa-farkhod/jumeoni.git
cd jumeoni
npm install
npm run dev
# open http://localhost:5173
```

Build for production:

```bash
npm run build         # outputs to dist/
npm run preview       # serve the production build locally
```

## Deploy to GitHub Pages

This repo has a `release.yml` workflow that handles everything:

1. Push your code to a GitHub repo
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**
3. Push to `main` → site auto-deploys to `https://<your-user>.github.io/<repo>/`
4. Push a tag like `v0.1.0` → cuts a GitHub Release with a downloadable `.zip` of the static build

That's it. The workflow auto-detects the repo name and sets Vite's `base` path correctly.

```bash
# release a new version
git tag v0.1.0
git push origin v0.1.0
```

## Deploy elsewhere

Jumeoni is a fully static site. The contents of `dist/` after `npm run build` will run from anywhere:

| Platform | How |
|---|---|
| **Vercel** | `vercel deploy` from the project root |
| **Netlify** | drag `dist/` into the Netlify dashboard, or connect the repo |
| **Cloudflare Pages** | connect the repo, build command `npm run build`, output `dist` |
| **S3 + CloudFront** | `aws s3 sync dist/ s3://your-bucket/` |
| **Your own server** | nginx serving `dist/` as a static root |

### Alternative proxies

- **Vercel Edge Function** — same pattern, deploys with the static frontend
- **Netlify Function** — same pattern, set `ANTHROPIC_API_KEY` in env vars
- **Self-hosted** — any tiny Express/Hono/Fastify app

---

## Architecture

```
index.html           ← landing page + app UI in one (PWA shell)
src/
  main.js            ← drop-zone wiring, state, file handling
  claudeClient.js    ← vision call to Gemini + the structured-output prompt
  renderer.js        ← turn JSON into the result UI
  samples.js         ← three built-in demo documents (no API key needed)
  style.css          ← design system: warm paper + Korean-red accent
public/
  favicon.svg
  icon-192.png       ← PWA install icon
  icon-512.png
  icon-512-maskable.png
  og-image.png       ← social share preview
.github/workflows/
  release.yml        ← build, deploy to Pages, cut tagged Releases
```

The system prompt in `claudeClient.js` is the heart of the product. It instructs AI not to translate but to **understand the Korean system context** and return a strict JSON schema. The prompt is heavily commented so you can tune it.

## ToDo (in the future)

If we keep building this past the hackathon:

- [ ] **Calendar export** — generate `.ics` files from extracted deadlines (one-click "add to calendar")
- [ ] **Korean reply drafter** — for KakaoTalk screenshots, draft a polite response in correctly-honorific Korean
- [ ] **History** — keep an indexed library of past documents (encrypted, client-side only)
- [ ] **Multi-page PDFs** — currently only the first page is analyzed
- [ ] **More document categories** — medical (insurance claims), legal (contracts), banking
- [ ] **Mobile native** — a Capacitor wrapper for iOS/Android with camera-first UX
- [ ] **B2B dashboard** — for HR teams supporting foreign employees in Korea

## License

MIT — see [LICENSE](LICENSE).

## Built with

[Gemini AI](https://gemini.google.com/app) · [Vite](https://vitejs.dev) · [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) · ☕

---

*Jumeoni ([주머니](https://dict.naver.com/dict.search?query=%EC%A3%BC%EB%A8%B8%EB%8B%88&from=tsearch)) means "pocket" in Korean — something small, personal, and always with you.*
