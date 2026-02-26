(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const revealSections = document.querySelectorAll(".section");

  // YouTube hero : autoplay + son à 8 % (on charge l'API nous-même après avoir défini le callback)
  function initHeroVideo() {
    var container = document.getElementById("hero-yt-player");
    if (!container) return;

    function createPlayer() {
      if (!window.YT || !window.YT.Player) return;
      new YT.Player(container, {
        videoId: "91iY8YFuAxg",
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
  initHeroVideo();

  // Header au scroll
  function onScroll() {
    if (window.scrollY > 80) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
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

  // Reveal au scroll (Intersection Observer)
  const observerOptions = { rootMargin: "-10% 0px -10% 0px", threshold: 0 };
  const observer = new IntersectionObserver(function (entries) {
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
})();
