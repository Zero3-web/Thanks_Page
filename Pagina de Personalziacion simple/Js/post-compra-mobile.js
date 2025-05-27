document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger-btn");
    const menu = document.getElementById("main-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            menu.classList.toggle("open");
            // Bloquear scroll horizontal cuando el menú está abierto
            if (menu.classList.contains("open")) {
                document.body.classList.add("menu-open");
            } else {
                document.body.classList.remove("menu-open");
            }
        });

        // Opcional: cerrar menú al hacer click en un enlace
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                menu.classList.remove("open");
                document.body.classList.remove("menu-open");
            });
        });
    }
});
