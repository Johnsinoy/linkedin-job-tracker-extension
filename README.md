# LinkedIn Job Tracker Extension 🚀

A lightweight Chrome Extension that helps job seekers track applications efficiently. It scrapes job details (Title, Company, Location, URL) directly from the active LinkedIn tab and saves them to a personal Google Sheet with a single click.

## 🌟 Features

* **Auto-Fill:** Automatically detects job details from the active LinkedIn job page.
* **Manual Override:** Edit details before saving (in case the scraper misses something).
* **Search Shortcut:** Start a LinkedIn job search directly from the extension popup.
* **Google Sheets Sync:** Instant, real-time saving to your personal spreadsheet.
* **Status Feedback:** Visual indicators for success, loading, or errors.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Platform:** Chrome Extension (Manifest V3)
* **Backend:** Google Apps Script (Serverless)
* **Database:** Google Sheets

## 📂 Project Structure

```text
linkedin-job-tracker-extension/
├── manifest.json       # Extension configuration and permissions
├── popup.html          # The user interface (inputs and buttons)
├── popup.js            # Logic for scraping, API calls, and UI handling
├── Code.gs             # The Google Apps Script (Backend logic)
└── README.md           # Documentation
