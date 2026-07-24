# lihaz.me — contact form backend

A tiny Express server that receives the portfolio's contact form and emails it
to `jsbbzbnx@gmail.com`. Your site itself (index.html/style.css/script.js)
stays a static site — only this small service needs to run somewhere with
Node.js.

## 1. Run it locally

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `SMTP_USER` — your Gmail address
- `SMTP_PASS` — a Gmail **App Password** (not your normal password):
  1. Turn on 2-Step Verification on the Google account: https://myaccount.google.com/security
  2. Go to https://myaccount.google.com/apppasswords
  3. Create an app password for "Mail" and paste the 16-character code in as `SMTP_PASS`

  (Any other SMTP provider — SendGrid, Mailgun, Resend, your web host — works
  too; just change `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS`.)

Then start it:

```bash
npm start
```

It runs on `http://localhost:4000`. Test it:

```bash
curl http://localhost:4000/api/health
```

## 2. Point the frontend at it

In `script.js`, set `CONTACT_API_URL` to wherever this backend is running
(the frontend file already reads this — see the top of the "contact form"
section). For local testing that's `http://localhost:4000/api/contact`;
in production it'll be your deployed backend URL, e.g.
`https://lihaz-contact-backend.onrender.com/api/contact`.

## 3. Deploy it (free options)

This needs a host that runs Node.js — GitHub Pages/Netlify/Vercel static
hosting alone won't run `server.js`. Easiest free options:

**Render.com**
1. Push the `backend/` folder to a GitHub repo (or a subfolder of your site's repo)
2. New → Web Service → connect the repo, set root directory to `backend`
3. Build command: `npm install` — Start command: `npm start`
4. Add the same environment variables from `.env` in Render's dashboard
5. Deploy — you'll get a URL like `https://your-app.onrender.com`

**Railway.app** — same idea: connect repo, set root to `backend`, add env vars, deploy.

Once deployed, update `ALLOWED_ORIGINS` in the backend's env vars to include
`https://lihaz.me`, and update `CONTACT_API_URL` in `script.js` to the live
backend URL.

## Notes

- The form has a hidden honeypot field (`company`) for basic spam protection —
  don't remove it from the HTML.
- Rate limiting caps submissions at 5 per 10 minutes per IP.
- The server never stores messages — it only relays them by email. Add a
  database later if you want a message history.
