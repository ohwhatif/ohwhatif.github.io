(function () {
  "use strict";

  var COPY = {
    "zh-Hant": {
      skipLink: "跳至主要內容",
      langGroupLabel: "切換語言",
      heroEyebrow: "INDEPENDENT DIGITAL STUDIO",
      heroLead:
        "把腦中一閃而過的「如果⋯⋯」，做成安靜、專注、值得反覆打開的網頁小作品。",
      liveSectionTitle: "已上線作品",
      liveStatus: "已上線",
      auroraDesc:
        "北歐即時極光觀測雷達。整合太陽風遙測、Kp 指數與即時雲量，陪你在晴朗的極夜抬頭遇見極光。",
      auroraSpecs: "太陽風遙測 · Kp 指數 · 北歐天空",
      auroraCta: "開啟極光雷達",
      upcomingSectionTitle: "預告 · 探索中",
      statusUpcoming: "籌備中",
      psychTitle: "心理",
      psychDesc:
        "關於情緒覺察、認知偏誤與自我對話的靜謐互動筆記。",
      psychTag: "Psychology",
      musicTitle: "音樂",
      musicDesc:
        "用耳朵直覺探索和弦、律動與微聲景的極簡聲音實驗室。",
      musicTag: "Music",
      dailySpecTitle: "Daily Spec｜日常成分表",
      dailySpecDesc:
        "把日常飲食、咖啡因與生活配方拆解成一目了然的成分規格表。",
      dailySpecTag: "Daily Spec",
      gamesTitle: "小遊戲",
      gamesDesc:
        "三分鐘上手、不打擾節奏的極簡解謎與策略小品。",
      gamesTag: "Mini-Games",
      footerNote: "© 2026 OhWhatIf · 零 Cookie · 無第三方追蹤腳本",
      metaDescription:
        "OhWhatIf — 獨立數位創作工作室。已上線作品：Nordic Aurora Radar｜極光即時雷達；探索心理、音樂、Daily Spec｜日常成分表與小遊戲。"
    },
    en: {
      skipLink: "Skip to main content",
      langGroupLabel: "Switch language",
      heroEyebrow: "INDEPENDENT DIGITAL STUDIO",
      heroLead:
        "Turning quiet \u201cwhat if\u201d questions into calm, focused tools crafted for the web.",
      liveSectionTitle: "Released",
      liveStatus: "Live",
      auroraDesc:
        "Real-time aurora radar for the Nordic skies. Synthesizing solar wind telemetry, Kp index, and cloud cover so you know when to look up.",
      auroraSpecs: "Solar Wind · Kp Index · Nordic Skies",
      auroraCta: "Open Radar",
      upcomingSectionTitle: "Upcoming",
      statusUpcoming: "Coming Soon",
      psychTitle: "Psychology",
      psychDesc:
        "Quiet interactive notes on emotional clarity, cognitive patterns, and self-reflection.",
      psychTag: "Reflection",
      musicTitle: "Music",
      musicDesc:
        "A miniature sound lab for exploring harmony, rhythm, and ambient acoustics by ear.",
      musicTag: "Acoustics",
      dailySpecTitle: "Daily Spec｜日常成分表",
      dailySpecDesc:
        "Everyday meals, caffeine, and daily routines distilled into clean specification sheets.",
      dailySpecTag: "Everyday Data",
      gamesTitle: "Mini-Games",
      gamesDesc:
        "Focused three-minute puzzles and minimalist toys built for quiet breaks.",
      gamesTag: "Play",
      footerNote: "© 2026 OhWhatIf · Zero cookies · No third-party JS",
      metaDescription:
        "OhWhatIf — Independent digital studio. Live: Nordic Aurora Radar. Upcoming explorations in psychology, music, Daily Spec, and mini-games."
    }
  };

  function detectInitialLanguage() {
    try {
      var params = new URLSearchParams(window.location.search);
      var queryLang = (params.get("lang") || "").toLowerCase();
      if (queryLang === "en") {
        return "en";
      }
      if (queryLang === "zh" || queryLang === "zh-hant" || queryLang === "zh-tw") {
        return "zh-Hant";
      }
    } catch (_) {
      // Ignore malformed query strings.
    }

    var browserLang = (navigator.language || "").toLowerCase();
    if (browserLang && browserLang.indexOf("zh") !== 0) {
      return "en";
    }
    return "zh-Hant";
  }

  function applyLanguage(lang) {
    var dict = COPY[lang] || COPY["zh-Hant"];
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i += 1) {
      var key = nodes[i].getAttribute("data-i18n");
      if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
        nodes[i].textContent = dict[key];
      }
    }

    var langGroup = document.getElementById("lang-switch");
    if (langGroup) {
      langGroup.setAttribute("aria-label", dict.langGroupLabel);
    }

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.metaDescription) {
      metaDesc.setAttribute("content", dict.metaDescription);
    }

    var buttons = document.querySelectorAll("[data-lang]");
    for (var j = 0; j < buttons.length; j += 1) {
      var btnLang = buttons[j].getAttribute("data-lang");
      buttons[j].setAttribute("aria-pressed", btnLang === lang ? "true" : "false");
    }
  }

  function trackProductionPageview() {
    var host = window.location.hostname;
    if (host !== "ohwhatif.com" && host !== "www.ohwhatif.com") {
      return;
    }

    var params = new URLSearchParams();
    params.set("p", window.location.pathname || "/");
    params.set("t", document.title || "OhWhatIf");
    params.set("rnd", Math.random().toString(36).slice(2, 10));

    var pixel = new Image(1, 1);
    pixel.referrerPolicy = "no-referrer";
    pixel.decoding = "async";
    pixel.alt = "";
    pixel.src = "https://ohwhatif.goatcounter.com/count?" + params.toString();
  }

  function init() {
    var initialLang = detectInitialLanguage();
    applyLanguage(initialLang);

    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener("click", function (event) {
        var targetLang = event.currentTarget.getAttribute("data-lang");
        if (targetLang && Object.prototype.hasOwnProperty.call(COPY, targetLang)) {
          applyLanguage(targetLang);
        }
      });
    }

    trackProductionPageview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
