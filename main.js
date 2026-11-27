(function () {
  "use strict";

  var COPY = {
    "zh-Hant": {
      skipLink: "跳至主要內容",
      mastheadColophon: "01 已上線 · 04 探索中",
      langGroupLabel: "切換語言",
      heroEpigraph: "「如果把腦中一閃而過的好奇，做成安靜而銳利的小工具？」",
      heroManifesto:
        "OhWhatIf 是一間獨立數位工作室。我們在極光、心理、聲音、日常成分與小遊戲之間實驗，打造安靜、零 Cookie、打開就能呼吸的網頁工具。",
      heroMetaLeft: "OHWHATIF.COM",
      heroMetaRight: "INDEPENDENT STUDIO",
      liveSectionLabel: "01 / 已上線作品",
      liveSectionIndex: "LIVE NOW",
      stageLive: "LIVE TELEMETRY",
      stageCaption: "69.65° N · 18.96° E",
      dossierBadge: "已上線",
      auroraTitleMain: "Nordic Aurora Radar",
      auroraTitleSub: "極光即時雷達",
      auroraDesc:
        "為北歐極夜打造的即時極光觀測雷達。整合太陽風速度、IMF Bz、Kp 指數與即時雲量，讓你在最合適的時刻抬頭看見極光。",
      specKey1: "DATA",
      specVal1: "太陽風遙測",
      specKey2: "SIGNAL",
      specVal2: "Kp 即時指數",
      specKey3: "REGION",
      specVal3: "北歐極圈",
      auroraCta: "開啟極光雷達",
      upcomingSectionLabel: "02 — 05 / 預告與探索",
      upcomingSectionIndex: "UPCOMING",
      statusUpcoming: "籌備中",
      psychTitle: "心理",
      psychDesc: "關於情緒覺察、認知慣性與自我提問的靜謐互動筆記。",
      musicTitle: "音樂",
      musicDesc: "以聽覺直覺探索和弦張力、節奏微差與環境聲景的微型實驗室。",
      dailySpecTitle: "Daily Spec｜日常成分表",
      dailySpecDesc: "把每天入口的飲食、咖啡因與生活節律，拆解成一目了然的規格表。",
      gamesTitle: "小遊戲",
      gamesDesc: "三分鐘就能上手、不綁架注意力的極簡解謎與空間小品。",
      footerCopy: "© 2026 OhWhatIf",
      footerPrivacy: "嚴格 CSP · NO-REFERRER · 零 COOKIE",
      metaDescription:
        "OhWhatIf — 獨立數位創作工作室。已上線作品：Nordic Aurora Radar｜極光即時雷達；探索心理、音樂、Daily Spec｜日常成分表與小遊戲。"
    },
    en: {
      skipLink: "Skip to main content",
      mastheadColophon: "01 RELEASED · 04 UPCOMING",
      langGroupLabel: "Switch language",
      heroEpigraph: "\u201cWhat if fleeting curiosities became quiet, sharp tools for the web?\u201d",
      heroManifesto:
        "OhWhatIf is an independent digital studio. We build calm, focused web instruments across northern skies, psychology, acoustics, everyday specs, and minimalist play—with zero cookies and zero noise.",
      heroMetaLeft: "OHWHATIF.COM",
      heroMetaRight: "INDEPENDENT STUDIO",
      liveSectionLabel: "01 / RELEASED WORK",
      liveSectionIndex: "LIVE NOW",
      stageLive: "LIVE TELEMETRY",
      stageCaption: "69.65° N · 18.96° E",
      dossierBadge: "LIVE",
      auroraTitleMain: "Nordic Aurora Radar",
      auroraTitleSub: "極光即時雷達",
      auroraDesc:
        "A real-time aurora radar built for Nordic nights. Synthesizing solar wind telemetry, IMF Bz, Kp index, and cloud cover so you know the exact hour to step outside.",
      specKey1: "DATA",
      specVal1: "Solar Wind",
      specKey2: "SIGNAL",
      specVal2: "Live Kp Index",
      specKey3: "REGION",
      specVal3: "Nordic Skies",
      auroraCta: "Open Radar",
      upcomingSectionLabel: "02 — 05 / UPCOMING STUDIES",
      upcomingSectionIndex: "IN PROGRESS",
      statusUpcoming: "COMING SOON",
      psychTitle: "Psychology",
      psychDesc: "Quiet interactive notes on emotional clarity, cognitive habits, and reflection.",
      musicTitle: "Music",
      musicDesc: "A miniature acoustic lab for exploring harmony, pulse, and spatial sound by ear.",
      dailySpecTitle: "Daily Spec｜日常成分表",
      dailySpecDesc: "Everyday meals, caffeine, and daily habits distilled into crisp specification sheets.",
      gamesTitle: "Mini-Games",
      gamesDesc: "Focused three-minute puzzles and spatial toys built for calm pauses.",
      footerCopy: "© 2026 OhWhatIf",
      footerPrivacy: "STRICT CSP · NO-REFERRER · ZERO COOKIES",
      metaDescription:
        "OhWhatIf — Independent digital studio. Live: Nordic Aurora Radar. Upcoming studies in psychology, music, Daily Spec, and mini-games."
    }
  };

  function detectInitialLanguage() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = (params.get("lang") || "").toLowerCase();
      if (q === "en") {
        return "en";
      }
      if (q === "zh" || q === "zh-hant" || q === "zh-tw") {
        return "zh-Hant";
      }
    } catch (_) {
      // Ignore malformed query strings.
    }

    var navLang = (navigator.language || "").toLowerCase();
    if (navLang && navLang.indexOf("zh") !== 0) {
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

  /* Slow, painterly Nordic aurora canvas — zero inline styles, CSP-clean */
  function initAuroraCanvas() {
    var canvas = document.getElementById("aurora-canvas");
    if (!canvas || !canvas.getContext) {
      return;
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var width = 0;
    var height = 0;
    var stars = [];

    function seedStars(w, h) {
      stars = [];
      var count = Math.max(24, Math.min(48, Math.floor((w * h) / 6200)));
      var seed = 1337;
      function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      }
      for (var i = 0; i < count; i += 1) {
        stars.push({
          x: rand() * w,
          y: rand() * h * 0.78,
          r: 0.45 + rand() * 0.9,
          a: 0.14 + rand() * 0.45,
          phase: rand() * Math.PI * 2
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars(width, height);
    }

    function drawFrame(t) {
      ctx.clearRect(0, 0, width, height);

      // Deep arctic night gradient
      var sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#040709");
      sky.addColorStop(0.55, "#071014");
      sky.addColorStop(0.86, "#081416");
      sky.addColorStop(1, "#050709");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Subtle northern stars
      for (var s = 0; s < stars.length; s += 1) {
        var st = stars[s];
        var twinkle = st.a * (0.78 + 0.22 * Math.sin(t * 0.7 + st.phase));
        ctx.fillStyle = "rgba(242, 240, 234, " + twinkle.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Silky vertical aurora light curtains (fine 2px slices for smooth atmospheric light)
      var bands = [
        {
          yBase: height * 0.47,
          amp1: height * 0.085,
          amp2: height * 0.04,
          speed: 0.22,
          colHeight: height * 0.36,
          hueA: "rgba(96, 228, 176, 0.14)",
          hueB: "rgba(58, 178, 168, 0.055)"
        },
        {
          yBase: height * 0.39,
          amp1: height * 0.06,
          amp2: height * 0.032,
          speed: -0.15,
          colHeight: height * 0.29,
          hueA: "rgba(130, 240, 198, 0.095)",
          hueB: "rgba(74, 152, 168, 0.038)"
        }
      ];

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      var step = 2;
      for (var b = 0; b < bands.length; b += 1) {
        var band = bands[b];
        for (var x = -6; x <= width + 6; x += step) {
          var nx = x / width;
          var env = Math.sin(Math.max(0, Math.min(1, nx)) * Math.PI);
          var wave =
            Math.sin(nx * 4.2 + t * band.speed + b * 1.9) * band.amp1 +
            Math.cos(nx * 8.6 - t * band.speed * 1.35) * band.amp2;
          var yBottom = band.yBase + wave;
          var shimmer =
            0.52 + 0.48 * Math.sin(nx * 12.0 + t * (band.speed * 1.9) + b);
          var hCol = band.colHeight * (0.52 + 0.68 * env) * shimmer;

          var grad = ctx.createLinearGradient(0, yBottom - hCol, 0, yBottom + 16);
          grad.addColorStop(0, "rgba(70, 210, 165, 0)");
          grad.addColorStop(0.55, band.hueB);
          grad.addColorStop(0.87, band.hueA);
          grad.addColorStop(1, "rgba(109, 227, 179, 0)");

          ctx.fillStyle = grad;
          ctx.fillRect(x, yBottom - hCol, step + 1, hCol + 16);
        }
      }

      ctx.restore();

      // Quiet polar mountain silhouette along lower horizon
      var horizonY = height * 0.84;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, horizonY + 8);
      ctx.lineTo(width * 0.14, horizonY - 2);
      ctx.lineTo(width * 0.28, horizonY + 6);
      ctx.lineTo(width * 0.44, horizonY - 12);
      ctx.lineTo(width * 0.58, horizonY + 2);
      ctx.lineTo(width * 0.74, horizonY - 7);
      ctx.lineTo(width * 0.9, horizonY + 4);
      ctx.lineTo(width, horizonY - 3);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#060809";
      ctx.fill();

      // Subtle horizon hairline
      ctx.strokeStyle = "rgba(242, 240, 234, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 8);
      ctx.lineTo(width * 0.14, horizonY - 2);
      ctx.lineTo(width * 0.28, horizonY + 6);
      ctx.lineTo(width * 0.44, horizonY - 12);
      ctx.lineTo(width * 0.58, horizonY + 2);
      ctx.lineTo(width * 0.74, horizonY - 7);
      ctx.lineTo(width * 0.9, horizonY + 4);
      ctx.lineTo(width, horizonY - 3);
      ctx.stroke();
    }

    resize();
    drawFrame(1.4);

    window.addEventListener("resize", function () {
      resize();
      if (prefersReduced) {
        drawFrame(1.4);
      }
    });

    if (!prefersReduced) {
      var start = performance.now();
      function loop(now) {
        var elapsed = (now - start) * 0.001 + 1.4;
        drawFrame(elapsed);
        window.requestAnimationFrame(loop);
      }
      window.requestAnimationFrame(loop);
    }
  }

  /* Cookieless 1x1 pixel — fires ONLY on production domain */
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
    applyLanguage(detectInitialLanguage());

    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener("click", function (event) {
        var targetLang = event.currentTarget.getAttribute("data-lang");
        if (targetLang && Object.prototype.hasOwnProperty.call(COPY, targetLang)) {
          applyLanguage(targetLang);
        }
      });
    }

    initAuroraCanvas();
    trackProductionPageview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
