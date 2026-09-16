# WhatsApp AI Image-to-Prompt Bot

Production-ready Node.js bot that only handles WhatsApp image messages and returns one polished AI image-generation prompt.

## What it does

1. Receives WhatsApp webhook events.
2. Verifies webhook challenge and validates signatures (when `WHATSAPP_APP_SECRET` is set).
3. Accepts only image/photo messages for analysis.
4. Downloads image securely from WhatsApp Cloud API.
5. Sends image to OpenAI vision model.
6. Builds one professional prompt in the required structure.
7. Sends prompt back to the same WhatsApp user.

If user sends only text (or other unsupported message types), bot replies:

`Please send an image/photo. I will create a detailed AI image-generation prompt from it.`

## Project structure

```text
/
├── src/
│   ├── server/
│   │   ├── config.js
│   │   └── index.js
│   ├── whatsapp/
│   │   ├── client.js
│   │   ├── handlers.js
│   │   └── webhookSecurity.js
│   ├── ai/
│   │   └── visionService.js
│   ├── image/
│   │   └── mediaService.js
│   ├── prompts/
│   │   └── promptBuilder.js
│   └── utils/
│       ├── http.js
│       └── logger.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Required environment variables

Copy `.env.example` to `.env` and fill values:

- `PORT`
- `REQUEST_TIMEOUT_MS`
- `TEMP_DIR`
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_API_VERSION`
- `WHATSAPP_APP_SECRET` (strongly recommended for signature validation)
- `OPENAI_API_KEY`
- `OPENAI_VISION_MODEL`

## Local development

```bash
cd /home/runner/work/Lihaz-coder.github.io/Lihaz-coder.github.io
npm install
cp .env.example .env
npm run dev
```

Health check:

```bash
curl http://localhost:4000/health
```

## WhatsApp webhook configuration

In Meta WhatsApp App Dashboard:

1. Open **WhatsApp > Configuration > Webhook**.
2. Set callback URL to your deployed `/webhook` endpoint.
3. Set verify token to exactly `WHATSAPP_VERIFY_TOKEN` value.
4. Subscribe to `messages` webhook field.
5. Make sure `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are from the same WhatsApp Cloud API setup.
6. Add `WHATSAPP_APP_SECRET` to enable request signature validation.

Webhook endpoints provided by app:

- `GET /webhook` for verification challenge.
- `POST /webhook` for incoming messages.

## Deployment (production)

Deploy as a Node.js web service (Render, Railway, Fly.io, VPS, etc.):

1. Connect repository.
2. Set start command: `npm start`.
3. Add all environment variables from `.env.example`.
4. Ensure HTTPS is enabled (required for Meta webhook callback).
5. Configure webhook callback URL to `https://your-domain/webhook`.

## Test by sending a photo

1. Start/deploy service and verify webhook.
2. Send a photo to the connected WhatsApp number.
3. Bot should reply with:
   - success header,
   - one complete prompt,
   - negative prompt block.

Text-only test:
- Send plain text message.
- Bot should return the required image-only guidance message.

## Error handling and privacy

- Invalid signatures are rejected when app secret is configured.
- Unsupported messages are handled safely.
- AI failures return:
  `❌ I couldn't analyze this image right now. Please send the photo again.`
- Images are temporarily stored in `TEMP_DIR` for processing and removed after completion.
- No permanent image storage is performed by this service.

## Notes / limitations

- WhatsApp sandbox/business account setup must be completed in Meta first.
- OpenAI billing and model access must be enabled for your key.
- Bot is intentionally not a general chatbot; it is image-to-prompt only.
