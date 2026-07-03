/* File: assets/js/components.js */

/* =========================================================
   SAMLEE ESTATES
   REUSABLE COMPONENT SCRIPTS
========================================================= */


/* =========================================================
   FAQ TABS
========================================================= */

const tabGroups = document.querySelectorAll("[data-tabs]");

tabGroups.forEach(function (tabGroup) {

    const tabButtons = tabGroup.querySelectorAll("[data-tab-button]");
    const tabPanels = tabGroup.querySelectorAll("[data-tab-panel]");

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedTab = button.getAttribute("data-tab-button");

            tabButtons.forEach(function (tabButton) {
                tabButton.classList.remove("active");
            });

            tabPanels.forEach(function (panel) {
                panel.classList.remove("active");
            });

            button.classList.add("active");

            const selectedPanel = tabGroup.querySelector('[data-tab-panel="' + selectedTab + '"]');

            if (selectedPanel) {
                selectedPanel.classList.add("active");
            }

        });

    });

});


/* =========================================================
   GALLERY FILTERS
========================================================= */

const galleryFilterWrapper = document.querySelector("[data-gallery-filters]");
const galleryGrid = document.querySelector("[data-gallery-grid]");

if (galleryFilterWrapper && galleryGrid) {

    const galleryButtons = galleryFilterWrapper.querySelectorAll("[data-gallery-filter]");
    const galleryItems = galleryGrid.querySelectorAll("[data-gallery-category]");

    galleryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.getAttribute("data-gallery-filter");

            galleryButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            galleryItems.forEach(function (item) {

                const itemCategory = item.getAttribute("data-gallery-category");

                if (selectedCategory === "all" || itemCategory === selectedCategory) {
                    item.classList.remove("is-hidden");
                } else {
                    item.classList.add("is-hidden");
                }

            });

        });

    });

}


/* =========================================================
   SMOOTH ANCHOR SCROLLING
========================================================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   ACTIVE PAGE LINK HELPER
========================================================= */

const navLinks = document.querySelectorAll(".nav a");
const currentPath = window.location.pathname;

navLinks.forEach(function (link) {

    const linkPath = new URL(link.href).pathname;

    if (currentPath === linkPath) {
        link.classList.add("active");
    }

});


/* =========================================================
   CTA CLICK LABELS
   Helpful for future analytics setup.
========================================================= */

const trackingLinks = document.querySelectorAll("a[href]");

trackingLinks.forEach(function (link) {

    const linkText = link.textContent.trim().toLowerCase();

    if (linkText.includes("apply")) {
        link.setAttribute("data-action", "apply");
    }

    if (linkText.includes("whatsapp")) {
        link.setAttribute("data-action", "whatsapp");
    }

    if (linkText.includes("viewing") || linkText.includes("book")) {
        link.setAttribute("data-action", "book-viewing");
    }

    if (linkText.includes("contact")) {
        link.setAttribute("data-action", "contact");
    }

});


/* =========================================================
   IMAGE FALLBACK
   Prevents broken layouts if a placeholder image path is missing.
========================================================= */

const componentImages = document.querySelectorAll(
    ".room-image img, .location-image img, .gallery-showcase-image img, .hero-image-card img, .who-image img"
);

componentImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.display = "none";

        const imageParent = image.parentElement;

        if (imageParent) {
            imageParent.classList.add("image-fallback");
        }

    });

});
