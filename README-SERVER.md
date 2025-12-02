Local server for KRREVIVEÉLITE Universe

Install dependencies (PowerShell):
```powershell
cd 'C:/Users/Home/kreviveelitewebst/krreviveelite-universe'
npm install
```

Run server (PowerShell):
```powershell
cd 'C:/Users/Home/kreviveelitewebst/krreviveelite-universe'
node server.js
```

Notes:
- Server serves the static site and provides API endpoints under `/api`.
- Configure `STRIPE_SECRET`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `OPENAI_API_KEY`, and `ADMIN_TOKEN` as environment variables for real integrations.
- Leaderboard is persisted in SQLite at `data/krrevive.db` (table `leaderboard`).
- Admin endpoints are protected by `ADMIN_TOKEN` header `X-ADMIN-TOKEN` or `?admin_token=` when using `admin.html`.
