# 💼 LinkedIn Job Tracker Extension (BYO Sheet)

A Chrome Extension that lets you scrape LinkedIn job postings and save them directly to your **own** Google Sheet. 

Unlike other trackers, this extension respects your privacy by allowing you to host your own data on your personal Google Drive.

## 🌟 Features

* **⚡ Auto-Fill:** Automatically grabs Job Title, Company, and Location from the active LinkedIn tab.
* **🛠️ Manual Edit:** Review and edit details before saving.
* **📂 Own Your Data:** Connects to your personal Google Sheet (no external database).
* **⚙️ Configurable:** Paste your own Web App URL in the settings panel.

## 🚀 Installation Guide

### Phase 1: Install the Extension
1.  Clone or download this repository.
2.  Open Chrome and go to `chrome://extensions/`.
3.  Toggle **Developer mode** (top right).
4.  Click **Load unpacked**.
5.  Select the folder containing these files.

---

### Phase 2: Setup Your Google Sheet (The Backend)
*You only need to do this once.*

1.  **Create a Sheet:**
    * Go to Google Sheets and create a new blank sheet.
    * Name the tab at the bottom **`Sheet1`**.
    * Add these headers in Row 1:
        * **A:** Date Saved
        * **B:** Job Title
        * **C:** Company
        * **D:** Location
        * **E:** Source
        * **F:** Job URL

2.  **Add the Script:**
    * In your Google Sheet, go to **Extensions** > **Apps Script**.
    * Delete any code there and paste the code from the [`Code.gs`](Code.gs) file in this repository.

3.  **Deploy as Web App:**
    * Click the blue **Deploy** button (top right) > **New deployment**.
    * **Select type:** Web app (click the gear icon).
    * **Description:** "Job Tracker v1".
    * **Execute as:** Me.
    * **Who has access:** **Anyone**. *(This is required for the extension to save data).*
    * Click **Deploy**.

4.  **Get the URL:**
    * Copy the **Web App URL** (starts with `https://script.google.com/...`).

---

### Phase 3: Connect Extension
1.  Click the **Job Tracker Extension icon** in Chrome.
2.  Click the **Show** button next to "Configuration".
3.  Paste your **Web App URL** into the box.
4.  Click **Save Configuration**.

✅ **You are ready!** Navigate to any LinkedIn job and click "Save to Sheet".

## 🛠️ Tech Stack
* **Frontend:** HTML, CSS, JavaScript (Chrome Extension Manifest V3)
* **Backend:** Google Apps Script
* **Database:** Google Sheets
* **Storage:** Chrome Sync Storage API

## 📄 License
MIT License
