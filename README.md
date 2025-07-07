# Premarket Options Intelligence Dashboard

This project is a standalone front‑end demo of an options trading dashboard. It renders several modules using sample data and does not require a backend service.

## Features

- **Manual and automatic data refresh.** The `SYNC NOW` button triggers a refresh and the app can auto‑refresh at a configurable interval.
- **Premarket Movers.** Displays top gainers and losers with option chain links.
- **Gap & Volatility Scanner.** Highlights stocks with significant gaps and IV rank data.
- **Catalyst Tracker.** Shows upcoming earnings, news headlines and macro events.
- **Technical Snapshot.** Provides a mini chart and common indicators such as RSI and MACD.
- **Options Heatmap.** Lists unusual options activity with metrics like put/call ratio.
- **Custom Filters & Market Timing.** Lets the user pick trading strategies and includes a countdown to the market open.
- Toast notifications and loading skeletons give realtime feedback during updates.

All demo data is stored locally in [`app.js`](app.js) and the additional JSON/CSV files included in the repository.

## Requirements

- [Python 3](https://www.python.org/) for the simple HTTP server.

## Quick Start

1. Clone the repository.
2. Run `./install.sh` to create a Python virtual environment.
3. Start the dashboard with `./install.sh --start` or manually run `source venv/bin/activate && python3 -m http.server`.
4. Open `http://localhost:8000/index.html` in your browser.

You can also open `index.html` directly without a server, but some browsers block certain features when loaded from the filesystem.

## Repository Contents

- `index.html` &mdash; main HTML structure with modules for market movers, gap scanners and more.
- `style.css` &mdash; styles for the dashboard.
- `app.js` &mdash; dashboard logic and sample data generation.
- `market_dashboard_data.json`, `historical_market_data.csv`, `investment_insights.json` &mdash; additional example datasets.

The project is intended for educational or prototyping purposes and is not connected to live market data.
