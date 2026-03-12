document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navbarRight = document.querySelector(".navbar-right");
    const navLinks = document.querySelectorAll(".nav-link");
    const statNumbers = document.querySelectorAll(".stat-number");

    if (navToggle && navbarRight) {
        navToggle.addEventListener("click", () => {
            navbarRight.classList.toggle("open");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            navLinks.forEach(l => l.classList.remove("active"));
            event.currentTarget.classList.add("active");

            if (window.innerWidth <= 768 && navbarRight.classList.contains("open")) {
                navbarRight.classList.remove("open");
            }
        });
    });

    // Animate statistics counters
    const animateCounter = (element, target, duration = 1500) => {
        let start = 0;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            element.textContent = `${value}+`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = `${target}+`;
            }
        };

        requestAnimationFrame(step);
    };

    statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        if (!Number.isNaN(target)) {
            animateCounter(el, target);
        }
    });
});