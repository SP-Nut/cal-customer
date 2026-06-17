# SP Kansard Calculator Rebuild

Clean rebuild of the SP Kansard awning and roofing price calculator.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Email Setup

Create `.env.local` with Gmail SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-google-app-password
CONTACT_EMAIL=spkansards@gmail.com
```

`SMTP_PASS` must be a Google App Password, not the normal Gmail password.

## Notes

The old codebase was removed intentionally. Preserved images live in `public/`, and rebuild guidance is in `SP_KANSARD_REBUILD_BRIEF.md`.
