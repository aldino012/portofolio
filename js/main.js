/* ================= MAIN JS ================= */
/* Enhanced with animations and interactions */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header");
  const projectCards = document.querySelectorAll(".project-card");
  const skillGroups = document.querySelectorAll(".skill-group");

  // ================= ACTIVE NAV ON SCROLL =================
  function setActiveNav() {
    let currentSection = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // ================= HEADER SCROLL EFFECT =================
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // ================= SMOOTH SCROLL =================
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      const offsetTop = targetSection.offsetTop - 70;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Update active nav
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ================= PROJECT CARD HOVER ANIMATION =================
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // ================= SKILL GROUP ANIMATION =================
  skillGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateY(20px)";

    setTimeout(() => {
      group.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }, index * 200);
  });

  // ================= TYPEWRITER EFFECT FOR HERO =================
  function initTypewriter() {
    const heroTitle = document.querySelector(".hero-text h1");
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    // Start typewriter after a short delay
    setTimeout(typeWriter, 300);
  }

  // ================= OBSERVER FOR ANIMATIONS =================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Animate experience items
        if (entry.target.id === "experience") {
          const experienceItems =
            entry.target.querySelectorAll(".experience-item");
          experienceItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateX(0)";
            }, index * 200);
          });
        }

        // Animate project cards
        if (entry.target.id === "projects") {
          const projectCards = entry.target.querySelectorAll(".project-card");
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  // ================= INITIALIZE =================
  function init() {
    setActiveNav();
    handleHeaderScroll();
    initTypewriter();

    // Set initial styles for animations
    document.querySelectorAll(".experience-item").forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    document.querySelectorAll(".project-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
  }

  // ================= EVENT LISTENERS =================
  window.addEventListener("scroll", () => {
    setActiveNav();
    handleHeaderScroll();
  });

  // Initialize
  init();
});
