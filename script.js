document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }

        });


        // Close menu after clicking a link

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuBtn.textContent = "☰";

            });

        });

    }


    /* =========================================
       SEARCH
    ========================================= */

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    const searchableElements = document.querySelectorAll(
        ".house-card, .character-card, .place, .theory, .timeline-item, .analysis-article"
    );


    function performSearch() {

        if (!searchInput) return;

        const query = searchInput.value
            .trim()
            .toLowerCase();

        searchableElements.forEach(function (element) {

            element.classList.remove("search-highlight");

        });


        if (query === "") {

            searchableElements.forEach(function (element) {

                element.style.display = "";

            });

            return;

        }


        let found = false;

        searchableElements.forEach(function (element) {

            const text = element.textContent.toLowerCase();

            if (text.includes(query)) {

                element.style.display = "";

                element.classList.add("search-highlight");

                if (!found) {

                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    found = true;

                }

            } else {

                element.style.display = "none";

            }

        });


        if (!found) {

            alert("لم يتم العثور على نتائج لـ: " + searchInput.value);

        }

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    /* =========================================
       CLEAR SEARCH WHEN INPUT BECOMES EMPTY
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                if (searchInput.value.trim() === "") {

                    searchableElements.forEach(function (element) {

                        element.style.display = "";

                        element.classList.remove(
                            "search-highlight"
                        );

                    });

                }

            }
        );

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target = document.querySelector(
                targetId
            );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".house-card, .character-card, .place, .theory, .timeline-item, .analysis-article"
    );


    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll(
        "header[id], section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =========================================
       SCROLL TO TOP BUTTON
    ========================================= */

    const topButton =
        document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "العودة إلى الأعلى"
    );

    topButton.id = "topButton";


    document.body.appendChild(
        topButton
    );


    topButton.style.position = "fixed";
    topButton.style.bottom = "25px";
    topButton.style.left = "25px";
    topButton.style.width = "45px";
    topButton.style.height = "45px";
    topButton.style.border = "1px solid #c9a45c";
    topButton.style.background = "#111";
    topButton.style.color = "#c9a45c";
    topButton.style.fontSize = "22px";
    topButton.style.cursor = "pointer";
    topButton.style.zIndex = "1000";
    topButton.style.opacity = "0";
    topButton.style.visibility = "hidden";
    topButton.style.transition = "0.3s";


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                topButton.style.opacity = "1";

                topButton.style.visibility =
                    "visible";

            } else {

                topButton.style.opacity = "0";

                topButton.style.visibility =
                    "hidden";

            }

        }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElement =
        document.querySelector(".copyright");

    if (yearElement) {

        const currentYear =
            new Date().getFullYear();

        yearElement.innerHTML =
            "© " +
            currentYear +
            " Westeros Archives — جميع الحقوق محفوظة للمشروع.";

    }


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "⚔ Westeros Archives loaded successfully."
    );

});
