# Expense Tracker (Combined MERN, Single Port)

## Requirements
- Node.js 18+
- MongoDB running locally (default URI: mongodb://127.0.0.1:27017/expense_tracker)

## Quick Start
1) In the project root:
   ```bash
   npm install          # installs server deps AND client deps
   npm run build        # builds React into ./public
   npm start            # start Express which serves the React build
   ```
   Open http://localhost:5000

## Dev mode (optional):
   - `npm run client:dev` runs Vite dev server (for fast frontend dev)
   - `npm run dev` runs only the Node server (serving the last build)
