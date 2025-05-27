document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger-btn");
    const menu = document.getElementById("main-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            menu.classList.toggle("open");
        });

        // Opcional: cerrar menú al hacer click en un enlace
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("open");
            });
        });
    }
});
