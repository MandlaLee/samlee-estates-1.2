/* ==========================================
   SamLee Estates
   main.js
   SamLee Estates 1.2
========================================== */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        initMobileMenu();
        initHeroSlider();
        initSmoothScroll();
        initStickyHeader();
        initFadeAnimations();
        initFaqs();
        initCurrentYear();
        setActiveNavLink();
        createBackToTopButton();
    });

    function initMobileMenu() {
        const button = document.getElementById("mobileMenuBtn");
        const nav = document.getElementById("nav");

        if (!button || !nav) return;

        button.setAttribute("type", "button");
        button.setAttribute("aria-label", "Open navigation menu");
        button.setAttribute("aria-controls", nav.id || "nav");
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("mobile-active");
            button.setAttribute("aria-expanded", String(isOpen));
            button.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && nav.classList.contains("mobile-active")) {
                nav.classList.remove("mobile-active");
                button.setAttribute("aria-expanded", "false");
                button.setAttribute("aria-label", "Open navigation menu");
                button.focus();
            }
        });
    }

    function initHeroSlider() {
        const slides = document.querySelectorAll(".hero-slide");
        if (slides.length <= 1) return;

        slides.forEach((slide, index) => slide.classList.toggle("active", index === 0));

        let current = 0;
        window.setInterval(() => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        }, 6000);
    }

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function initStickyHeader() {
        const header = document.querySelector(".header");
        if (!header) return;

        let ticking = false;

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 50);
            header.style.boxShadow = window.scrollY > 50 ? "0 8px 25px rgba(0,0,0,0.08)" : "none";
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        updateHeader();
    }

    function initFadeAnimations() {
        const cards = document.querySelectorAll(
            ".quick-card, .feature-card, .category-card, .resource-card, .property-card, .testimonial-card, .faq-card, .stat-card, .contact-card"
        );

        if (!cards.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach((card) => observer.observe(card));
    }

    function initFaqs() {
        const questions = document.querySelectorAll(".faq-question");
        if (!questions.length) return;

        questions.forEach((question, index) => {
            const card = question.closest(".faq-card");
            const answer = card ? card.querySelector(".faq-answer") : null;
            const answerId = answer && answer.id ? answer.id : `faq-answer-${index + 1}`;

            question.setAttribute("role", "button");
            question.setAttribute("tabindex", "0");
            question.setAttribute("aria-expanded", card && card.classList.contains("open") ? "true" : "false");

            if (answer) {
                answer.id = answerId;
                question.setAttribute("aria-controls", answerId);
            }

            const toggle = () => {
                if (!card) return;
                const isOpen = card.classList.toggle("open");
                question.setAttribute("aria-expanded", String(isOpen));
            };

            question.addEventListener("click", toggle);
            question.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggle();
                }
            });
        });
    }

    function setActiveNavLink() {
        const currentPath = normalizePath(window.location.pathname);
        const links = document.querySelectorAll(".nav a");

        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            const linkPath = normalizePath(new URL(href, window.location.href).pathname);
            if (currentPath === linkPath) {
                link.classList.add("active-link");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    function normalizePath(path) {
        return path.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    }

    function initCurrentYear() {
        const year = new Date().getFullYear();
        document.querySelectorAll(".current-year").forEach((element) => {
            element.textContent = year;
        });
    }

    function createBackToTopButton() {
        if (document.querySelector(".back-to-top")) return;

        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "↑";
        button.className = "back-to-top";
        button.setAttribute("aria-label", "Back to top");
        document.body.appendChild(button);

        let ticking = false;
        const toggleButton = () => {
            button.classList.toggle("show", window.scrollY > 500);
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(toggleButton);
                ticking = true;
            }
        }, { passive: true });

        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    console.log("SamLee Estates website loaded: https://mandlalee.github.io/SamLee/");
}());
