/* ============================================================
   LIHAZ.me — contact form backend
   Receives POST /api/contact, validates it, emails it to the
   owner via Nodemailer, and returns a JSON result the frontend
   can show a success/error message from.
   ============================================================ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

/* ---- config -------------------------------------------------- */
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'jsbbzbnx@gmail.com';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://lihaz.me,http://localhost:5500,http://127.0.0.1:5500')
  .split(',').map(s => s.trim());

/* ---- middleware ------------------------------------------------ */
app.use(express.json({ limit: '20kb' }));

app.use(cors({
  origin(origin, cb) {
    // allow same-origin / curl / no-origin requests (e.g. health checks)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  }
}));

// Basic abuse protection: 5 submissions per 10 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again later.' }
});

/* ---- mail transport --------------------------------------------- */
// Works with Gmail (use an App Password, not your normal password) or
// any SMTP provider (SendGrid, Mailgun, Resend, your host's SMTP, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/* ---- helpers ------------------------------------------------------ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---- routes ------------------------------------------------------- */
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, company } = req.body || {};

    // honeypot: real users never fill the hidden "company" field
    if (company) {
      return res.json({ ok: true }); // pretend success, silently drop
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }
    if (String(message).length > 5000) {
      return res.status(400).json({ ok: false, error: 'Message is too long.' });
    }

    const safeName = escapeHtml(name);
    const safeSubject = escapeHtml(subject || 'New message from lihaz.me');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: `"lihaz.me contact form" <${process.env.SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `[lihaz.me] ${subject || 'New message'} — from ${name}`,
      html: `
        <div style="font-family:sans-serif; line-height:1.6;">
          <h2 style="margin:0 0 12px;">New contact form message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong sending your message. Please try again, or email directly.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`);
});
