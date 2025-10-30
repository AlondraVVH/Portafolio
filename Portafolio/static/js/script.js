/**
 * script.js
 * Funciones de Interactividad, Manipulación del DOM y Validación.
 * Se utiliza 'this' para referenciar el elemento que dispara el evento.
 */

// ----------------------------------------------------
// 1. FUNCIONES DE EVENTOS (Requeridas por la pauta)
// ----------------------------------------------------

/**
 * Item 8 y 13: Resalta visualmente una tarjeta (ej. en Portafolio) al hacer mouseover.
 * @param {HTMLElement} elemento - La tarjeta (div.card) que disparó el evento (this).
 */
function resaltarTarjeta(elemento) {
    // Aplicamos estilos dinámicos a través de 'this'
    elemento.style.boxShadow = '0 15px 35px rgba(0, 123, 255, 0.6)'; // Sombra intensa
    elemento.style.transform = 'scale(1.03)';
    elemento.style.borderColor = 'var(--color-primario)'; // Usa la variable CSS
    
    // Obtener la imagen y aplicarle un filtro
    const imagen = elemento.querySelector('img');
    if (imagen) {
        imagen.style.transform = 'scale(1.1)'; // Pequeño zoom suave
    }
    console.log("Tarjeta Portafolio resaltada (JS/this):", elemento.querySelector('.card-title').innerText);
}

/**
 * Item 9: Normaliza los estilos de la tarjeta al hacer mouseout.
 * @param {HTMLElement} elemento - La tarjeta (div.card) que disparó el evento (this).
 */
function normalizarTarjeta(elemento) {
    // Restablecer estilos
    elemento.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    elemento.style.transform = 'scale(1)';
    elemento.style.borderColor = '#e0e0e0';

    const imagen = elemento.querySelector('img');
    if (imagen) {
        imagen.style.transform = 'scale(1)';
    }
}

/**
 * Item 10 y 14: Función demo para remover una entrada de educación/experiencia.
 * Usa .closest() para encontrar el ancestro removible.
 * @param {HTMLElement} elementoBoton - El botón 'Ocultar' que disparó el evento (this).
 */
function removerEntrada(elementoBoton) {
    // Encontramos el contenedor principal a remover (el ancestro más cercano con la clase)
    const contenedorPadre = elementoBoton.closest('.item-removible'); 
    
    if (contenedorPadre) {
        // Opcional: Añadir una confirmación
        // if (confirm('¿Desea ocultar este elemento? (Demo de JS)')) {
            // Agregamos un efecto de desvanecimiento antes de remover
            contenedorPadre.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            contenedorPadre.style.opacity = '0';
            contenedorPadre.style.transform = 'scale(0.95)';
            
            // Esperamos a que termine la animación para removerlo
            setTimeout(() => {
                contenedorPadre.remove(); // Remueve el elemento del DOM
            }, 300); // 300 milisegundos
        // }
    }
}

/**
 * Item 11: Valida el campo de correo electrónico al cambiar su contenido (onchange).
 * @param {HTMLInputElement} elementoInput - El campo de input de correo (this).
 */
function validarCorreo(elementoInput) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mensaje = document.getElementById('mensaje-validacion');
    
    if (regexCorreo.test(elementoInput.value)) {
        elementoInput.classList.add('is-valid');
        elementoInput.classList.remove('is-invalid');
        mensaje.style.display = 'none';
        console.log("Correo válido ingresado.");
    } else {
        elementoInput.classList.add('is-invalid');
        elementoInput.classList.remove('is-valid');
        mensaje.style.display = 'block'; // Muestra el <p> de error
        console.log("Correo inválido detectado.");
    }
}

/**
 * Item 8: Función de onmouseover en el botón CTA de Inicio.
 * @param {HTMLElement} elemento - El botón que disparó el evento (this).
 */
function resaltarBoton(elemento) {
    elemento.style.backgroundColor = '#0056b3';
    elemento.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.8)';
}

/**
 * Item 9: Función de onmouseout en el botón CTA de Inicio.
 * @param {HTMLElement} elemento - El botón que disparó el evento (this).
 */
function normalizarBoton(elemento) {
    elemento.style.backgroundColor = 'var(--color-primario)'; // Vuelve al color primario
    elemento.style.boxShadow = 'none';
}

// ----------------------------------------------------
// 2. FUNCIONES DE MEJORA DE EXPERIENCIA (UX)
// ----------------------------------------------------

/**
 * Función para el Scroll Suave (Item 33 de la pauta)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Nueva funcionalidad: Fondo del Navbar al hacer scroll
 * Esto añade/quita la clase '.scrolled' que definimos en el CSS.
 */
document.addEventListener('DOMContentLoaded', () => {
    // ¡¡CORREGIDO!! Usamos el ID en español.
    const barraNavegacion = document.getElementById('barraNavegacion');

    // Aseguramos que el elemento exista antes de añadir el listener
    if (barraNavegacion) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Aparece después de 50px de scroll
                barraNavegacion.classList.add('scrolled');
            } else {
                barraNavegacion.classList.remove('scrolled');
            }
        });
    } else {
        console.error("Error: No se encontró el elemento #barraNavegacion");
    }
});

/**
 * Animación de Barras de Habilidades (Intersection Observer)
 * Esto anima las barras de progreso cuando entran en la pantalla.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    const skillsSection = document.getElementById('habilidades');
    const progressBars = document.querySelectorAll('#habilidades .progress-bar');

    if (!skillsSection || progressBars.length === 0) {
        console.warn("No se encontró la sección de habilidades o las barras de progreso.");
        return;
    }

    // Configura el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si la sección de 'habilidades' está visible
            if (entry.isIntersecting) {
                console.log("Sección Habilidades visible, animando barras...");
                
                // Recorre cada barra
                progressBars.forEach(bar => {
                    // Aplica el ancho guardado en 'data-width'
                    // Esto dispara la transición de CSS
                    bar.style.width = bar.dataset.width;
                });
                
                // Una vez animadas, dejamos de observar la sección
                observer.unobserve(skillsSection);
            }
        });
    }, { 
        // La animación se dispara cuando al menos el 20% de la sección es visible
        threshold: 0.2 
    });

    // Empezamos a observar la sección de 'habilidades'
    observer.observe(skillsSection);
});