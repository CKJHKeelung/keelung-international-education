const demo = {
  courses: [
    {
      title: "淨零綠生活國際交流課程",
      description: "結合 SDG 13 與國際交流，引導學生思考氣候行動。",
      url: "#"
    }
  ],
  exchanges: [
    {
      title: "成功國中與大野中學校線上交流",
      description: "雙方學生自我介紹，討論夢想與未來。",
      url: "#"
    }
  ],
  albums: [
    {
      title: "國際教育教師增能工作坊 FB 相簿",
      description: "研習照片與成果紀錄，可連結 Facebook 相簿或 Google 相簿。",
      url: "#"
    }
  ],
  resources: [
    {
      title: "國際教育課程設計模板",
      description: "教案模板、簡報與學習單範本。",
      url: "#"
    }
  ],
  settings: {
    contactFormUrl: "#"
  }
};

function renderCards(elementId, items) {
  const element = document.getElementById(elementId);

  element.innerHTML = (items || []).map(function(item) {
    const label = getLinkLabel(item.url);

    return `
      <article class="item">
        <h3>${escapeHtml(item.title || "")}</h3>
        <p>${escapeHtml(item.description || "")}</p>
        ${
          item.url
            ? `<a href="${item.url}" target="_blank" rel="noopener">${label} →</a>`
            : ""
        }
      </article>
    `;
  }).join("");
}

function getLinkLabel(url) {
  const text = String(url || "").toLowerCase();

  if (text.includes("facebook.com") || text.includes("fb.com")) {
    return "查看 FB 相簿";
  }

  if (text.includes("photos.google.com")) {
    return "查看 Google 相簿";
  }

  if (text.includes("drive.google.com")) {
    return "查看雲端資料";
  }

  if (text.includes("youtube.com") || text.includes("youtu.be")) {
    return "觀看影片";
  }

  if (text.includes("docs.google.com/presentation")) {
    return "查看成果簡報";
  }

  if (text.includes("docs.google.com/forms")) {
    return "填寫表單";
  }

  return "查看內容";
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[match];
  });
}

function renderSite(data) {
  renderCards("courses", data.courses);
  renderCards("exchanges", data.exchanges);
  renderCards("albums", data.albums);
  renderCards("resourcesList", data.resources);

  document.getElementById("contactForm").href =
    data.settings && data.settings.contactFormUrl
      ? data.settings.contactFormUrl
      : "#";
}

/**
 * Apps Script JSONP callback
 */
window.renderSite = renderSite;

(function loadData() {
  const api = window.APPS_SCRIPT_API;

  if (!api || api.includes("PASTE_YOUR")) {
    renderSite(demo);
    return;
  }

  const script = document.createElement("script");
  script.src = `${api}?action=siteData&callback=renderSite`;

  script.onerror = function() {
    renderSite(demo);
  };

  document.body.appendChild(script);
})();
