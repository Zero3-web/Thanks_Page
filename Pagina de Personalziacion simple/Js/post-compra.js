// Elimina simulación de backend, usa datos fijos en el frontend

document.addEventListener("DOMContentLoaded", () => {
    // Loading overlay control
    const loading = document.getElementById("loading-overlay");
    const mainContent = document.getElementById("main-content");
    const mensajePersonalizado = document.getElementById("mensaje-personalizado");
    // Mensaje personalizado (puedes cambiar el nombre directamente aquí)
    const mensaje = `¡Los codigos han sido enviados a tu email registrado`;
    if (mensajePersonalizado) {
        mensajePersonalizado.textContent = "";
        mensajePersonalizado.style.display = "none"; // Oculto por defecto
    }

    // Oculta el botón "Siguiente" al inicio
    const continuarBtn = document.getElementById("continuar-btn");
    if (continuarBtn) {
        continuarBtn.style.display = "none";
        continuarBtn.classList.remove('show');
    }

    // Retrasar la aparición del widget Buy Me a Coffee SOLO después del loading
    const bmcScript = document.querySelector('script[data-name="BMC-Widget"]');
    if (bmcScript) {
        bmcScript.type = "text/plain";
    }

    if (loading && mainContent) {
        setTimeout(() => {
            loading.style.opacity = "0";
            setTimeout(() => {
                loading.style.display = "none";
                mainContent.style.display = "";
                // Mostrar mensaje personalizado con efecto typing después del loading
                if (mensajePersonalizado) {
                    mensajePersonalizado.style.display = "";
                    let i = 0;
                    mensajePersonalizado.textContent = "";
                    function typing() {
                        if (i < mensaje.length) {
                            mensajePersonalizado.textContent += mensaje.charAt(i);
                            i++;
                            setTimeout(typing, 40);
                        } else {
                            // Sonido de confirmación al terminar el typing
                            playSuccessSound();
                            // Animación de entrada (fade-in y slide-in)
                            mensajePersonalizado.classList.add('fade-slide-in');
                        }
                    }
                    typing();
                }
                // Mostrar el botón "Siguiente" después de 1 segundo con transición suave
                if (continuarBtn) {
                    setTimeout(() => {
                        continuarBtn.style.display = "inline-block";
                        // Forzar reflow para transición
                        void continuarBtn.offsetWidth;
                        continuarBtn.classList.add('show');
                    }, 1000);
                }
                // Inyectar Buy Me a Coffee widget después del loading y con retraso
                if (bmcScript) {
                    setTimeout(() => {
                        const script = document.createElement("script");
                        for (let i = 0; i < bmcScript.attributes.length; i++) {
                            const attr = bmcScript.attributes[i];
                            if (attr.name !== "type") {
                                script.setAttribute(attr.name, attr.value);
                            }
                        }
                        document.body.appendChild(script);
                    }, 1000); // 1 segundo después del loading
                }
            }, 600);
        }, 3000); // 3 segundos de loading
    }

    // Sonido de confirmación (breve y agradable)
    function playSuccessSound() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = 660;
        g.gain.value = 0.13;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => {
            o.frequency.value = 880;
        }, 80);
        setTimeout(() => {
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
            o.stop(ctx.currentTime + 0.09);
            setTimeout(() => ctx.close(), 120);
        }, 180);
    }

    // Botón continuar
    if (continuarBtn) {
        continuarBtn.onclick = () => {
            const instrucciones = document.getElementById("instrucciones");
            instrucciones.style.display = "block";
            // Fuerza reflow para que la transición funcione correctamente
            void instrucciones.offsetWidth;
            instrucciones.classList.add('show');

            continuarBtn.style.display = "none";
            // Cambia el título por "¿Ahora qué sigue?"
            document.querySelector(".post-compra-container h1").textContent = "¿Ahora qué sigue?";
            // Oculta el mensaje personalizado
            document.getElementById("mensaje-personalizado").style.display = "none";

            // Mostrar el botón de Youtube 5 segundos después de mostrar los pasos
            const btnYoutube = document.getElementById("btn-youtube-container");
            btnYoutube.style.display = "none";
            btnYoutube.style.opacity = 0;
            setTimeout(() => {
                btnYoutube.style.display = "block";
                // Forzar reflow para transición
                void btnYoutube.offsetWidth;
                btnYoutube.style.transition = "opacity 0.7s";
                btnYoutube.style.opacity = 1;
            }, 5000);
        };
    }
});
