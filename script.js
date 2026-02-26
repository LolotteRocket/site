(function () {
  "use strict";

  const main = document.getElementById("main-content");
  const loadingEl = main?.querySelector(".loading-message");

  function renderCard(card) {
    const li = document.createElement("li");
    li.className = "card card-image";

    const media = document.createElement("div");
    const info = document.createElement("div");
    info.className = "card-info";
    const titleSpan = document.createElement("span");
    titleSpan.className = "card-title";
    titleSpan.textContent = card.title;
    info.appendChild(titleSpan);

    if (card.type === "sketchfab") {
      media.className = "card-media card-media-embed";
      const iframe = document.createElement("iframe");
      iframe.title = card.title;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("mozallowfullscreen", "true");
      iframe.setAttribute("webkitallowfullscreen", "true");
      iframe.setAttribute("allow", "autoplay; fullscreen; xr-spatial-tracking");
      const params = card.embedParams || "";
      iframe.src = "https://sketchfab.com/models/" + card.sketchfabId + "/embed" + params;
      media.appendChild(iframe);
    } else if (card.type === "image") {
      media.className = "card-media card-media--full";
      const img = document.createElement("img");
      img.src = card.src;
      img.alt = card.alt || card.title;
      img.loading = "lazy";
      media.appendChild(img);
    } else if (card.type === "youtube") {
      media.className = "card-media card-media-embed card-media-video";
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + card.videoId + "?rel=0";
      iframe.title = card.title;
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      media.appendChild(iframe);
    }

    li.appendChild(media);
    li.appendChild(info);
    return li;
  }

  function renderSection(sectionKey, sectionData) {
    const section = document.createElement("section");
    section.className = "section " + sectionKey;
    section.id = sectionData.id;

    const container = document.createElement("div");
    container.className = "container";

    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = sectionData.title;

    const intro = document.createElement("p");
    intro.className = "section-intro";
    intro.textContent = sectionData.intro;

    const ul = document.createElement("ul");
    ul.className = "grid " + sectionData.gridClass;

    sectionData.cards.forEach(function (card) {
      ul.appendChild(renderCard(card));
    });

    container.appendChild(title);
    container.appendChild(intro);
    container.appendChild(ul);
    section.appendChild(container);
    return section;
  }

  function initHeroVideo(videoId) {
    var container = document.getElementById("hero-yt-player");
    if (!container || !videoId) return;

    function createPlayer() {
      if (!window.YT || !window.YT.Player) return;
      new YT.Player(container, {
        videoId: videoId,
        playerVars: {
          rel: 0,
          autoplay: 1,
          mute: 1,
          enablejsapi: 1,
          controls: 1
        },
        events: {
          onReady: function (event) {
            var player = event.target;
            player.playVideo();
            player.unMute();
            player.setVolume(6);
            setTimeout(function () {
              player.playVideo();
            }, 300);
            setTimeout(function () {
              player.playVideo();
            }, 1000);
          }
        }
      });
    }

    window.onYouTubeIframeAPIReady = createPlayer;

    if (window.YT && window.YT.loaded) {
      createPlayer();
    } else {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
  }

  function runAfterLoad(data) {
    document.title = data.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", data.meta.description);

    var logo = document.getElementById("header-logo");
    if (logo) logo.textContent = data.header.logo;

    var navEl = document.getElementById("header-nav");
    if (navEl) {
      data.header.nav.forEach(function (item) {
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        navEl.appendChild(a);
      });
    }

    main.innerHTML = "";

    var heroSection = document.createElement("section");
    heroSection.className = "hero hero-with-video";
    heroSection.id = "film";
    heroSection.innerHTML =
      '<div class="hero-video-wrap">' +
      '<div id="hero-yt-player" class="hero-iframe" aria-label="' + escapeAttr(data.hero.ariaLabel) + '"></div>' +
      '<div class="hero-video-overlay" aria-hidden="true"></div>' +
      "</div>" +
      '<div class="hero-content">' +
      '<p class="hero-label">' + escapeHtml(data.hero.label) + "</p>" +
      '<h1 class="hero-title">' + escapeHtml(data.hero.title) + "</h1>" +
      '<p class="hero-desc">' + escapeHtml(data.hero.desc) + "</p>" +
      "</div>" +
      '<div class="scroll-hint" aria-hidden="true">' +
      "<span>" + escapeHtml(data.hero.scrollHint) + "</span>" +
      '<span class="scroll-arrow">↓</span>' +
      "</div>";
    main.appendChild(heroSection);

    main.appendChild(renderSection("Modelisation", data.sections.modelisation));
    main.appendChild(renderSection("substance", data.sections.substance));

    var ig = data.instagram;
    var igSection = document.createElement("section");
    igSection.className = "section instagram-section";
    igSection.id = "instagram";
    igSection.innerHTML =
      '<div class="container">' +
      '<h2 class="section-title">' + escapeHtml(ig.title) + "</h2>" +
      '<p class="section-intro">' + escapeHtml(ig.intro) + "</p>" +
      '<div class="instagram-embed-wrap">' +
      '<iframe src="https://www.instagram.com/' + escapeAttr(ig.username) + '/embed" title="Instagram @' + escapeAttr(ig.username) + '" class="instagram-embed" allow="encrypted-media" loading="lazy"></iframe>' +
      "</div>" +
      '<p class="instagram-embed-link">' +
      '<a href="https://www.instagram.com/' + escapeAttr(ig.username) + '/" target="_blank" rel="noopener noreferrer">' + escapeHtml(ig.linkText) + "</a>" +
      "</p>" +
      "</div>";
    main.appendChild(igSection);

    var footer = document.getElementById("site-footer");
    if (footer) {
      var nameEl = document.getElementById("footer-name");
      var tagEl = document.getElementById("footer-tagline");
      if (nameEl) nameEl.textContent = data.footer.name;
      if (tagEl) tagEl.textContent = data.footer.tagline;
      footer.style.display = "";
    }

    initHeroVideo(data.hero.videoId);

    var header = document.querySelector(".site-header");
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".nav");
    var navLinks = document.querySelectorAll(".nav a");
    var revealSections = document.querySelectorAll(".section");

    function onScroll() {
      if (window.scrollY > 80) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", !expanded);
        nav.classList.toggle("open");
        document.body.style.overflow = expanded ? "" : "hidden";
      });
      navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          menuBtn.setAttribute("aria-expanded", "false");
          nav.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    var observerOptions = { rootMargin: "-10% 0px -10% 0px", threshold: 0 };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);
    revealSections.forEach(function (section) {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
  function escapeAttr(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  fetch("data.json")
    .then(function (r) {
      if (!r.ok) throw new Error("Erreur chargement data.json");
      return r.json();
    })
    .then(runAfterLoad)
    .catch(function (err) {
      if (loadingEl) {
        loadingEl.textContent = "Impossible de charger le contenu. Vérifiez que data.json existe.";
      }
      console.error(err);
    });
})();
