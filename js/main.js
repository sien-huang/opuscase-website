/* ============================================================
   KECAI Packaging — main.js
   Language switching / hero slider / counters / interactions
   ============================================================ */

(function () {
  "use strict";

  var LANGS = ["zh", "en", "es", "ru", "ar"];
  var currentLang = "en";

  /* Product imagery — language-independent, keeps photos in sync with card backdrops.
     Tin + rigid paper gift box sets, richer and more consistent than the early single-product shots. */
  var PRODUCT_IMGS = [
    "images/combo-1.png",       // mooncake / candy / biscuit tins
    "images/combo-box-3.png",   // tea caddies / wine boxes
    "images/combo-3.png",       // dairy / supplements / seasoning
    "images/combo-box-1.png",   // electronics / premium gift boxes
    "images/prod-shaped.png",   // special-shaped tins
    "images/hero-products.png"  // printed tinplate / aluminium sheets
  ];

  /* ---------- Language helpers ---------- */

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem("kecai_lang"); } catch (e) { /* ignore */ }
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("zh") === 0) return "zh";
    if (nav.indexOf("es") === 0) return "es";
    if (nav.indexOf("ru") === 0) return "ru";
    if (nav.indexOf("ar") === 0) return "ar";
    return "en";
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "en";
    currentLang = lang;
    try { localStorage.setItem("kecai_lang", lang); } catch (e) { /* ignore */ }
    var dict = I18N[lang];
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dict.dir || "ltr");
    applyTexts(dict);
    buildLanguageMenu();
    var toggleLabel = document.getElementById("lang-current");
    if (toggleLabel) toggleLabel.textContent = dict.langName;
    document.title = (lang === "zh")
      ? "深圳市柯彩实业有限公司 - 印花马口铁包装 | 精品礼盒制造商"
      : "Shenzhen Kecai Industrial Co., Ltd. - Printed Tinplate Packaging Manufacturer";
  }

  function t(sel, text) {
    var el = document.querySelector(sel);
    if (el && text != null) el.textContent = text;
  }

  function applyTexts(d) {
    // Nav
    t("[data-i18n=nav-home]", d.nav.home);
    t("[data-i18n=nav-about]", d.nav.about);
    t("[data-i18n=nav-products]", d.nav.products);
    t("[data-i18n=nav-quality]", d.nav.quality);
    t("[data-i18n=nav-strengths]", d.nav.strengths);
    t("[data-i18n=nav-contact]", d.nav.contact);
    t("[data-i18n=nav-quote]", d.nav.quote);

    // Hero slides
    var slides = document.querySelectorAll(".hero-slide");
    for (var i = 0; i < slides.length; i++) {
      var h = d.hero[i];
      if (!h) continue;
      var title = slides[i].querySelector(".hero-title");
      var sub = slides[i].querySelector(".hero-sub");
      var btn = slides[i].querySelector(".hero-btn");
      if (title) title.textContent = h.title;
      if (sub) sub.textContent = h.sub;
      if (btn) btn.textContent = h.btn;
      var bg = slides[i].querySelector(".hero-bg");
      if (bg) bg.style.backgroundImage = 'url("' + h.img + '")';
    }

    // Strengths
    t("[data-i18n=strengths-tag]", d.strengthsSection.tag);
    t("[data-i18n=strengths-title]", d.strengthsSection.title);
    t("[data-i18n=strengths-sub]", d.strengthsSection.sub);
    var cards = document.querySelectorAll("#strengths-grid .strength-card");
    for (var j = 0; j < cards.length; j++) {
      var s = d.strengths[j];
      if (!s) continue;
      var ct = cards[j].querySelector("h3");
      var cp = cards[j].querySelector("p");
      if (ct) ct.textContent = s.title;
      if (cp) cp.textContent = s.text;
    }

    // Stats
    var stats = document.querySelectorAll("#stats-band .stat");
    for (var k = 0; k < stats.length; k++) {
      var st = d.stats[k];
      if (!st) continue;
      var numEl = stats[k].querySelector(".stat-num");
      var sufEl = stats[k].querySelector(".stat-suffix");
      var labEl = stats[k].querySelector(".stat-label");
      if (numEl) numEl.setAttribute("data-target", st.num.replace(/[^0-9]/g, ""));
      if (sufEl) sufEl.textContent = st.suffix;
      if (labEl) labEl.textContent = st.label;
      if (numEl) numEl.textContent = st.num;
    }

    // Products
    t("[data-i18n=products-tag]", d.productsSection.tag);
    t("[data-i18n=products-title]", d.productsSection.title);
    t("[data-i18n=products-sub]", d.productsSection.sub);
    t("[data-i18n=products-more]", d.productsSection.more);
    var prods = document.querySelectorAll("#products-grid .product-card");
    for (var p = 0; p < prods.length; p++) {
      var it = d.productsSection.items[p];
      if (!it) continue;
      var img = prods[p].querySelector("img");
      var pt = prods[p].querySelector("h3");
      var pp = prods[p].querySelector("p");
      if (img && it.img) img.src = PRODUCT_IMGS[p] || it.img;
      if (img) img.alt = it.title;
      if (pt) pt.textContent = it.title;
      if (pp) pp.textContent = it.text;
    }

    // Quality
    t("[data-i18n=quality-tag]", d.qualitySection.tag);
    t("[data-i18n=quality-title]", d.qualitySection.title);
    t("[data-i18n=quality-policy-title]", d.qualitySection.policyTitle);
    t("[data-i18n=quality-policy]", d.qualitySection.policy);
    t("[data-i18n=quality-spirit-title]", d.qualitySection.spiritTitle);
    t("[data-i18n=quality-spirit]", d.qualitySection.spirit);
    t("[data-i18n=quality-idea-title]", d.qualitySection.ideaTitle);
    t("[data-i18n=quality-idea]", d.qualitySection.idea);
    t("[data-i18n=quality-goal-title]", d.qualitySection.goalTitle);
    t("[data-i18n=quality-goal]", d.qualitySection.goal);

    // About
    t("[data-i18n=about-tag]", d.aboutSection.tag);
    t("[data-i18n=about-title]", d.aboutSection.title);
    t("[data-i18n=about-p1]", d.aboutSection.p1);
    t("[data-i18n=about-p2]", d.aboutSection.p2);
    t("[data-i18n=about-btn]", d.aboutSection.btn);

    // Contact
    t("[data-i18n=contact-tag]", d.contactSection.tag);
    t("[data-i18n=contact-title]", d.contactSection.title);
    t("[data-i18n=contact-sub]", d.contactSection.sub);
    t("[data-i18n=contact-name]", d.contactSection.name);
    t("[data-i18n=contact-email]", d.contactSection.email);
    t("[data-i18n=contact-phone]", d.contactSection.phone);
    t("[data-i18n=contact-message]", d.contactSection.message);
    t("[data-i18n=contact-send]", d.contactSection.send);
    t("[data-i18n=contact-info-title]", d.contactSection.infoTitle);
    t("[data-i18n=contact-company]", d.contactSection.company);
    t("[data-i18n=contact-person]", d.contactSection.person);
    t("[data-i18n=contact-phonelabel]", d.contactSection.phoneLabel);
    t("[data-i18n=contact-emaillabel]", d.contactSection.emailLabel);
    t("[data-i18n=contact-addr]", d.contactSection.addr);

    // Footer
    t("[data-i18n=footer-about]", d.footer.about);
    t("[data-i18n=footer-links]", d.footer.links);
    t("[data-i18n=footer-products]", d.footer.products);
    t("[data-i18n=footer-contact]", d.footer.contact);
    t("[data-i18n=footer-rights]", d.footer.rights);
  }

  function buildLanguageMenu() {
    var menu = document.getElementById("lang-menu");
    if (!menu) return;
    menu.innerHTML = "";
    LANGS.forEach(function (code) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = I18N[code].langName;
      if (code === currentLang) a.className = "active";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        setLang(code);
        menu.classList.remove("open");
      });
      li.appendChild(a);
      menu.appendChild(li);
    });
  }

  /* ---------- Hero slider ---------- */

  var heroIndex = 0, heroTimer = null;

  function showSlide(i) {
    var slides = document.querySelectorAll(".hero-slide");
    var dots = document.querySelectorAll(".hero-dot");
    if (!slides.length) return;
    heroIndex = (i + slides.length) % slides.length;
    for (var k = 0; k < slides.length; k++) {
      slides[k].classList.toggle("active", k === heroIndex);
    }
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle("active", d === heroIndex);
    }
  }

  function startHero() {
    var dots = document.querySelectorAll(".hero-dot");
    for (var d = 0; d < dots.length; d++) {
      (function (idx) {
        dots[idx].addEventListener("click", function () {
          showSlide(idx);
          restartTimer();
        });
      })(d);
    }
    restartTimer();
  }

  function restartTimer() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(function () { showSlide(heroIndex + 1); }, 6000);
  }

  /* ---------- Counters ---------- */

  function animateCounters() {
    var band = document.getElementById("stats-band");
    if (!band) return;
    var nums = band.querySelectorAll(".stat-num[data-target]");
    // ?noanim=1 → render final values immediately (testing/screenshots)
    if (window.location.search.indexOf("noanim") !== -1) {
      nums.forEach(function (el) {
        var target = parseFloat(el.getAttribute("data-target")) || 0;
        el.textContent = target.toLocaleString();
      });
      return;
    }
    var seen = false;
    function run() {
      if (seen) return;
      var rect = band.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        seen = true;
        nums.forEach(function (el) {
          var target = parseFloat(el.getAttribute("data-target")) || 0;
          var dur = 1400, t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var prog = Math.min((ts - t0) / dur, 1);
            var val = Math.floor(target * (1 - Math.pow(1 - prog, 3)));
            el.textContent = val.toLocaleString();
            if (prog < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
          }
          requestAnimationFrame(step);
        });
      }
    }
    window.addEventListener("scroll", run, { passive: true });
    run();
  }

  /* ---------- Misc UI ---------- */

  function initMobileNav() {
    var btn = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (btn && links) {
      btn.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") links.classList.remove("open");
      });
    }
  }

  function initLangDropdown() {
    var toggle = document.getElementById("lang-toggle");
    var menu = document.getElementById("lang-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("open");
      });
      document.addEventListener("click", function () {
        menu.classList.remove("open");
      });
    }
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    window.addEventListener("scroll", function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    // ?noanim=1 disables entrance animations (used for testing/screenshots)
    if (window.location.search.indexOf("noanim") !== -1) {
      document.documentElement.classList.add("no-anim");
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initForm() {
    var form = document.getElementById("inquiry-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = I18N[currentLang];
      var status = document.getElementById("form-status");
      var btn = form.querySelector("button[type=submit]");
      var payload = {
        name: (form.elements["name"] || {}).value || "",
        email: (form.elements["email"] || {}).value || "",
        phone: (form.elements["phone"] || {}).value || "",
        message: (form.elements["message"] || {}).value || "",
        lang: currentLang
      };

      function showOk(text) {
        if (status) {
          status.textContent = text;
          status.className = "form-status ok";
        }
        form.reset();
      }
      function showFail(text) {
        if (status) {
          status.textContent = text;
          status.className = "form-status err";
        }
      }

      if (!kecaiCloud || !kecaiCloud.database) {
        // SDK not loaded (e.g. offline preview) — keep the demo behaviour.
        if (btn) { btn.disabled = true; btn.textContent = d.contactSection.sending; }
        setTimeout(function () {
          if (btn) { btn.disabled = false; btn.textContent = d.contactSection.send; }
          showOk(d.contactSection.ok);
        }, 600);
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = d.contactSection.sending; }
      kecaiCloud.database
        .from("inquiries")
        .insert(payload)
        .then(function (res) {
          if (btn) { btn.disabled = false; btn.textContent = d.contactSection.send; }
          if (res && res.error) {
            showFail(d.contactSection.fail);
            return;
          }
          showOk(d.contactSection.ok);
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = d.contactSection.send; }
          showFail(d.contactSection.fail);
        });
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    currentLang = detectLang();
    setLang(currentLang);
    showSlide(0);
    startHero();
    initMobileNav();
    initLangDropdown();
    initHeaderScroll();
    initReveal();
    initForm();
    initYear();
    animateCounters();
  });
})();
