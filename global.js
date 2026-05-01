/**
 * Global JavaScript for Cyber Portfolio
 */

function typewriter(elementId, text, speed = 90, onDone) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor-blink";
  el.appendChild(cursor);
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(tick, speed);
    } else if (onDone) onDone();
  };
  setTimeout(tick, 300);
}

window.typewriter = typewriter;

function initWriteupFilter() {
  const bar = document.querySelector(".filter-bar");
  const list = document.querySelector(".writeups-editorial");
  if (!bar || !list) return;

  const buttons = bar.querySelectorAll("[data-filter]");
  const items = list.querySelectorAll("[data-category]");

  if (buttons.length === 0 || items.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      items.forEach((item) => {
        item.style.display =
          cat === "all" || item.dataset.category === cat ? "" : "none";
      });
    });
  });
}

const ThemeManager = {
  init() {
    const themeToggleBtn = document.querySelector(".theme-toggle");
    const icon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

    if (!themeToggleBtn || !icon) return;

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      if (currentTheme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }

    themeToggleBtn.addEventListener("click", () => {
      let targetTheme = "light";
      const current = document.documentElement.getAttribute("data-theme");

      if (current === "light") {
        targetTheme = "dark";
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }

      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("theme", targetTheme);
    });
  },
};

const MobileMenu = {
  init() {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-nav-link");
    const closeBtn = document.querySelector(".mobile-menu-close");

    if (!hamburger || !mobileMenu) return;

    const openMenu = () => {
      hamburger.classList.add("active");
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  },
};

const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  },
};

const NavigationHighlighter = {
  init() {
    const links = document.querySelectorAll(".nav-link, .mobile-nav-link");

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (this.pathMatches(href)) {
        link.classList.add("active");
      }
    });
  },

  pathMatches(href) {
    let targetUrl;
    try {
      targetUrl = new URL(href, window.location.href);
    } catch {
      return false;
    }

    const here = new URL(window.location.href);
    const targetPath = targetUrl.pathname;
    const herePath = here.pathname;

    if (targetPath === herePath) {
      return true;
    }

    const targetFile = targetPath.split("/").filter(Boolean).pop() || "";
    const hereParts = herePath.split("/").filter(Boolean);
    const hereFile = hereParts.pop() || "";

    if (targetFile && hereFile === targetFile) {
      return true;
    }

    if (
      targetFile === "writeups.html" &&
      /\/writeups\//i.test(herePath) &&
      hereFile !== "writeups.html"
    ) {
      return true;
    }

    if (
      targetFile === "projects.html" &&
      /\/projects\//i.test(herePath) &&
      hereFile !== "projects.html"
    ) {
      return true;
    }

    if (targetFile === "index.html") {
      if (/\/writeups\//i.test(herePath)) return false;
      if (/\/projects\//i.test(herePath)) return false;
      const isHome =
        hereFile === "index.html" ||
        hereFile === "" ||
        herePath.endsWith("/");
      return isHome;
    }

    return false;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  MobileMenu.init();
  SmoothScroll.init();
  NavigationHighlighter.init();
  initWriteupFilter();
});
