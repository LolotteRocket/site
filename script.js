(function () {
  "use strict";

  const main = document.getElementById("main-content");
  const loadingEl = main?.querySelector(".loading-message");

  function renderCard(card, sectionKey) {
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
    } else if (card.type === "embed") {
      var isMinijeuEmbed = sectionKey === "minijeu";
      if (isMinijeuEmbed) {
        media.className = "card-media card-media-embed-cover";
        media.setAttribute("role", "button");
        media.tabIndex = 0;
        media.setAttribute("data-embed-url", card.url);
        media.setAttribute("data-embed-title", card.title || "");
        if (card.width && card.height) {
          media.setAttribute("data-embed-width", card.width);
          media.setAttribute("data-embed-height", card.height);
        }
        if (card.cover && card.cover.src) {
          var coverImg = document.createElement("img");
          coverImg.src = card.cover.src;
          coverImg.alt = card.cover.alt || card.title;
          coverImg.loading = "lazy";
          media.appendChild(coverImg);
        } else {
          var placeholder = document.createElement("div");
          placeholder.className = "card-embed-placeholder";
          placeholder.setAttribute("aria-hidden", "true");
          media.appendChild(placeholder);
        }
        var playOverlay = document.createElement("div");
        playOverlay.className = "card-embed-play";
        playOverlay.setAttribute("aria-hidden", "true");
        playOverlay.innerHTML = "<span>▶</span>";
        media.appendChild(playOverlay);
        if (card.link && card.link.href) {
          li.setAttribute("data-embed-link-href", card.link.href);
          li.setAttribute("data-embed-link-text", card.link.text || "Voir le lien");
          info.classList.add("card-info-with-link");
          var linkBtn = document.createElement("a");
          linkBtn.href = card.link.href;
          linkBtn.target = "_blank";
          linkBtn.rel = "noopener noreferrer";
          linkBtn.className = "card-embed-link";
          linkBtn.textContent = card.link.text || "Voir le lien";
          info.appendChild(linkBtn);
        }
      } else {
        media.className = "card-media card-media-embed card-media-embed-iframe";
        var iframe = document.createElement("iframe");
        iframe.src = card.url;
        iframe.title = card.title || "";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        if (card.width && card.height) {
          media.style.aspectRatio = card.width + " / " + card.height;
        }
        media.appendChild(iframe);
      }
    } else if (card.type === "link") {
      media.className = "card-media card-media-link";
      const a = document.createElement("a");
      a.href = card.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "card-link-wrap";
      if (card.image && card.image.src) {
        const img = document.createElement("img");
        img.src = card.image.src;
        img.alt = card.image.alt || card.title;
        img.loading = "lazy";
        a.appendChild(img);
      } else {
        const span = document.createElement("span");
        span.className = "card-link-placeholder";
        span.textContent = "→";
        a.appendChild(span);
      }
      media.appendChild(a);
      titleSpan.textContent = card.linkText || card.title;
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
      ul.appendChild(renderCard(card, sectionKey));
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
    if (data.sections.minijeu) {
      main.appendChild(renderSection("minijeu", data.sections.minijeu));
    }

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

    initEmbedModal();

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

  function initEmbedModal() {
    var overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true" aria-label="Jeu en plein écran">' +
      '<div class="modal-actions">' +
      '<a class="modal-link" href="#" target="_blank" rel="noopener noreferrer" style="display: none;"></a>' +
      '<button type="button" class="modal-close" aria-label="Fermer">×</button>' +
      "</div>" +
      '<div class="modal-iframe-wrap"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    var iframeWrap = overlay.querySelector(".modal-iframe-wrap");
    var closeBtn = overlay.querySelector(".modal-close");
    var modalLink = overlay.querySelector(".modal-link");

    function closeModal() {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      modalLink.style.display = "none";
      modalLink.removeAttribute("href");
      var inner = iframeWrap.querySelector(".modal-iframe-inner");
      if (inner) {
        var iframe = inner.querySelector("iframe");
        if (iframe) iframe.src = "";
        iframeWrap.removeChild(inner);
      }
    }

    function openModal(url, title, width, height, link) {
      var inner = document.createElement("div");
      inner.className = "modal-iframe-inner";
      var iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.title = title || "";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      inner.appendChild(iframe);
      iframeWrap.appendChild(inner);
      if (link && link.href) {
        modalLink.href = link.href;
        modalLink.textContent = link.text || "Voir le lien";
        modalLink.style.display = "";
      } else {
        modalLink.style.display = "none";
      }
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
    });

    main.addEventListener("click", function (e) {
      var media = e.target.closest(".card-media-embed-cover");
      if (!media) return;
      e.preventDefault();
      var card = media.closest(".card");
      var url = media.getAttribute("data-embed-url");
      var title = media.getAttribute("data-embed-title");
      var w = media.getAttribute("data-embed-width");
      var h = media.getAttribute("data-embed-height");
      var link = card && card.getAttribute("data-embed-link-href")
        ? { href: card.getAttribute("data-embed-link-href"), text: card.getAttribute("data-embed-link-text") }
        : null;
      if (url) openModal(url, title, w ? parseInt(w, 10) : null, h ? parseInt(h, 10) : null, link);
    });

    main.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var media = e.target.closest(".card-media-embed-cover");
      if (!media) return;
      e.preventDefault();
      var card = media.closest(".card");
      var url = media.getAttribute("data-embed-url");
      var title = media.getAttribute("data-embed-title");
      var w = media.getAttribute("data-embed-width");
      var h = media.getAttribute("data-embed-height");
      var link = card && card.getAttribute("data-embed-link-href")
        ? { href: card.getAttribute("data-embed-link-href"), text: card.getAttribute("data-embed-link-text") }
        : null;
      if (url) openModal(url, title, w ? parseInt(w, 10) : null, h ? parseInt(h, 10) : null, link);
    });
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
