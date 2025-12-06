// ----------------------------------------
// 1️⃣ INITIALIZATION & SETTINGS LOGIC
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  // A. Load saved Settings
  chrome.storage.sync.get(['webAppUrl'], (result) => {
    if (result.webAppUrl) {
      document.getElementById("userWebAppUrl").value = result.webAppUrl;
    } else {
      // If no URL is saved, open settings automatically
      document.getElementById("settingsPanel").classList.remove("hidden");
      document.getElementById("toggleSettings").innerText = "Hide";
      document.getElementById("status").textContent = "⚠️ Please set your Web App URL above!";
      document.getElementById("status").className = "error";
    }
  });

  // B. Run Auto-Fill Logic
  runAutoFill();
});

// Toggle Settings Panel
document.getElementById("toggleSettings").addEventListener("click", () => {
  const panel = document.getElementById("settingsPanel");
  const btn = document.getElementById("toggleSettings");
  if (panel.classList.contains("hidden")) {
    panel.classList.remove("hidden");
    btn.innerText = "Hide";
  } else {
    panel.classList.add("hidden");
    btn.innerText = "Show";
  }
});

// Save Settings Button
document.getElementById("saveSettings").addEventListener("click", () => {
  const url = document.getElementById("userWebAppUrl").value.trim();
  if (!url.startsWith("https://script.google.com/")) {
    document.getElementById("settingsStatus").textContent = "❌ Invalid URL format.";
    document.getElementById("settingsStatus").className = "error";
    return;
  }
  
  chrome.storage.sync.set({ webAppUrl: url }, () => {
    document.getElementById("settingsStatus").textContent = "✅ Saved!";
    document.getElementById("settingsStatus").className = "success";
    document.getElementById("status").textContent = ""; // Clear main error
    setTimeout(() => {
        document.getElementById("settingsPanel").classList.add("hidden");
        document.getElementById("toggleSettings").innerText = "Show";
    }, 1000);
  });
});

// ----------------------------------------
// 2️⃣ SAVE BUTTON LOGIC (Dynamic URL)
// ----------------------------------------
document.getElementById("btnSave").addEventListener("click", async () => {
  const statusEl = document.getElementById("status");
  const btn = document.getElementById("btnSave");

  // 1. GET THE SAVED URL FIRST
  const storedData = await chrome.storage.sync.get(['webAppUrl']);
  const WEB_APP_URL = storedData.webAppUrl;

  if (!WEB_APP_URL) {
    statusEl.textContent = "❌ Error: Web App URL is missing. Check Settings.";
    statusEl.className = "error";
    document.getElementById("settingsPanel").classList.remove("hidden");
    return;
  }

  const payload = {
    jobTitle: document.getElementById("jobTitle").value,
    company: document.getElementById("company").value,
    location: document.getElementById("jobLocation").value,
    url: document.getElementById("jobUrl").value,
    source: "Extension Auto-Fill"
  };

  if (!payload.jobTitle) {
    statusEl.textContent = "❌ Job Title is missing!";
    statusEl.className = "error";
    return;
  }

  statusEl.textContent = "⏳ Saving...";
  statusEl.className = "";
  btn.disabled = true;

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, 
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    statusEl.textContent = "✅ Saved to Sheet!";
    statusEl.className = "success";
    setTimeout(() => window.close(), 1500);

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Error: " + err.message;
    statusEl.className = "error";
    btn.disabled = false;
  }
});

// ----------------------------------------
// 3️⃣ AUTO-FILL & SEARCH (Helper Functions)
// ----------------------------------------
async function runAutoFill() {
  const loadingMsg = document.getElementById("loadingMsg");
  loadingMsg.style.display = "block";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    document.getElementById("jobUrl").value = tab.url;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrapeJobData
    }, (results) => {
      loadingMsg.style.display = "none";
      if (results && results[0] && results[0].result) {
        const data = results[0].result;
        if(data.title) document.getElementById("jobTitle").value = data.title;
        if(data.company) document.getElementById("company").value = data.company;
        if(data.location) document.getElementById("jobLocation").value = data.location;
      }
    });
  }
}

function scrapeJobData() {
  function get(s) { const e = document.querySelector(s); return e ? e.innerText.trim().replace(/\n/g, " ") : null; }
  
  let title = get(".job-details-jobs-unified-top-card__job-title h1") || get("h1.top-card-layout__title") || get("h1");
  let company = get(".job-details-jobs-unified-top-card__company-name") || get(".top-card-layout__first-subline .topcard__org-name-link");
  let location = get(".job-details-jobs-unified-top-card__bullet") || get(".top-card-layout__first-subline .topcard__flavor--bullet");

  return { title, company, location };
}

document.getElementById("btnSearch").addEventListener("click", () => {
  const k = document.getElementById("searchKeyword").value;
  const l = document.getElementById("searchLocation").value;
  const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(k)}&location=${encodeURIComponent(l)}`;
  chrome.tabs.create({ url: url });
});