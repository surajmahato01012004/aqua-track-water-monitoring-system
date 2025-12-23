# Aqua Track: Water Quality Monitoring System — 5‑Minute Demo Script

Duration: ~5:00. Audience: product reviewers and technical interviewers. Goal: show end‑to‑end WQI computation, data management, map, chatbot, background UX, APIs, and deployment.

## 0:00–0:20 Intro
- Show the dashboard (`/dashboard`). Read the navbar title: “Aqua Track: Water Quality Monitoring System”.
- One sentence on mission: “Compute, visualize, and manage Water Quality Index across locations with AI assistance.”

## 0:20–1:10 Calculator
- Navigate to Calculator (`/`). Point out inputs: pH, DO, Turbidity, TDS, Nitrate, Temperature.
- Enter sample values and click Calculate. The chart animates and the score updates; status badge color follows the 5‑tier scale.
- Mention dynamic weighting and temperature handling. Reference: `calculate_wqi` in app.py:117–173; status mapping in app.py:176–188.

## 1:10–2:00 Data Page (CRUD + Export)
- Open Database (`/data`). Show list of locations with latest WQI, status, and timestamp.
- Create a new location; then add a sample including temperature. WQI computes and badge color appears.
- Update sample inline; observe status change.
- Click “Download CSV/Excel”. Export includes temperature and status. Reference: `download_excel` in app.py:406–446.
- Note auto‑migration for temperature on startup for backward compatibility.

## 2:00–2:40 Map Page
- Open Map (`/map`). Show markers colored by WQI category.
- Click on the map to query nearest location; see info window with WQI, status, and coordinates.
- Explain JSON sources: `GET /api/locations` and `GET /api/wqi?lat&lng`. References: app.py:454–495 and app.py:613–642.

## 2:40–3:15 Chatbot
- Open Chatbot. Ask a WQI‑related question (e.g., “What affects Dissolved Oxygen?”).
- Mention model: `HuggingFaceTB/SmolLM3-3B:hf-inference` via HF Router; content cleaned server‑ and client‑side. References: app.py:221–352 and static/chatbot.js.
- Note limitations (no DB/RAG yet), and improvement plan for domain alignment.

## 3:15–3:45 UI & UX Details
- Show the animated water background: canvas waves, turquoise gradient; high‑contrast content layer for legibility.
- Point out the scrolling hardware integration banner on dashboard.
- Briefly highlight consistent titles and branding across pages.

## 3:45–4:20 APIs Quick Tour
- Display a few sample calls:
  - `POST /calculate` with JSON → returns `wqi`, `status`, `color`.
  - `GET /api/locations` → array of latest WQI per location.
  - `GET /api/wqi?lat=...&lng=...` → nearest location WQI.
- Emphasize uniform status/color mapping and simple JSON contracts for external clients.

## 4:20–4:50 Deployment
- Local: `python app.py` → `http://127.0.0.1:5000/`. Set `GOOGLE_MAPS_API_KEY`, `HUGGING_FACE_API_TOKEN`, optional `HF_CHAT_MODEL`.
- Render: use `Procfile` (`gunicorn app:app`), set environment variables, prefer managed Postgres via `DATABASE_URL`.
- Mention that SQLite is for dev; production uses Postgres and can add migrations (Flask‑Migrate).

## 4:50–5:00 Closing
- Summarize benefits: fast WQI insights, CRUD + exports, interactive map, chatbot, and clean UX.
- Next steps: auth, RAG‑powered chatbot, sensor streaming, export filters, and analytics dashboard.

## Subtitles (SRT, 5:00)

1
00:00:00,000 --> 00:00:15,000
Welcome to Aqua Track: Water Quality Monitoring System. In this five‑minute demo, we will compute WQI, manage data, explore the map, use the chatbot, review APIs, and cover deployment.

2
00:00:15,000 --> 00:00:30,000
This is the dashboard. The navbar shows our site name. Use the cards to open the calculator, the map, the database dashboard, and the AI chatbot.

3
00:00:30,000 --> 00:00:45,000
On the calculator page, enter pH, dissolved oxygen, turbidity, total dissolved solids, nitrate, and temperature. These values drive the WQI calculation.

4
00:00:45,000 --> 00:01:00,000
Click Calculate. The chart animates with the WQI score. The status badge changes color according to the five‑tier scale: Excellent, Good, Poor, Very Poor, and Unfit.

5
00:01:00,000 --> 00:01:15,000
The WQI logic uses dynamic weighting based on standards, and temperature is handled as an absolute deviation from the ideal. This makes results consistent across inputs.

6
00:01:15,000 --> 00:01:30,000
Open the database page. It lists user‑added locations with their latest samples, WQI values, status, and timestamps. Here you can add, update, and delete data.

7
00:01:30,000 --> 00:01:45,000
Create a location by entering a name and coordinates. The new row appears immediately, ready for samples that will generate WQI.

8
00:01:45,000 --> 00:02:00,000
Add a sample with parameters including temperature. The server computes WQI and updates the badge color. Edit the sample to see the status change live.

9
00:02:00,000 --> 00:02:15,000
Click Download CSV or Excel. The export includes location metadata, all parameters, WQI, status, temperature, and timestamps for reporting.

10
00:02:15,000 --> 00:02:30,000
Open the map page. Each marker is colored by the WQI category. This makes it easy to scan water quality across locations.

11
00:02:30,000 --> 00:02:45,000
Click anywhere on the map to request the nearest location’s WQI. An info window shows the name, coordinates, score, and status.

12
00:02:45,000 --> 00:03:00,000
These interactions use simple JSON APIs: one to list all locations with latest WQI, and one to compute the nearest WQI from map clicks.

13
00:03:00,000 --> 00:03:15,000
Open the chatbot page. Ask a question about WQI, such as what affects dissolved oxygen. The chatbot replies with concise, helpful guidance.

14
00:03:15,000 --> 00:03:30,000
We use the SmolLM3‑3B model hosted on Hugging Face Router. The app cleans outputs and enforces a short delay to avoid spamming the backend.

15
00:03:30,000 --> 00:03:45,000
Notice the animated water background. The canvas waves and turquoise gradient add motion while a high‑contrast content layer keeps text legible.

16
00:03:45,000 --> 00:04:00,000
Here is a quick API tour: Calculate returns WQI, status, and color. Locations returns latest WQI per location. Nearest WQI returns the closest location’s WQI.

17
00:04:00,000 --> 00:04:15,000
For local development, install dependencies, set environment variables as needed, run python app, and open the site at localhost five thousand.

18
00:04:15,000 --> 00:04:30,000
For Render deployment, use the Procfile with gunicorn, configure managed Postgres via database URL, and set API keys for maps and the chatbot.

19
00:04:30,000 --> 00:04:45,000
Remember the limitations: SQLite is for development, the chatbot is generic, and accuracy improves with domain‑tuned models and retrieval augmentation.

20
00:04:45,000 --> 00:05:00,000
To conclude, Aqua Track delivers fast WQI insights, CRUD and exports, an interactive map, and an AI assistant. Next steps include auth, RAG chatbot, sensor streaming, and analytics.
