/**
 * main.js
 * Funciones de Interactividad, Manipulación del DOM y Validación.
 * Se utiliza 'this' para referenciar el elemento que dispara el evento.
 */

// ----------------------------------------------------
// Requisito 6 & 7: Efectos Hover/Click y Manipulación del DOM con 'this'
// ----------------------------------------------------

/**
 * Resalta visualmente una tarjeta (ej. en Portfolio) al hacer mouseover.
 * @param {HTMLElement} elemento - La tarjeta (div.card) que disparó el evento (this).
 */
function resaltarTarjeta(elemento) {
    // Aplicamos estilos dinámicos a través de 'this'
    elemento.style.boxShadow = '0 15px 35px rgba(0, 123, 255, 0.6)'; // Sombra intensa
    elemento.style.transform = 'scale(1.03)';
    elemento.style.borderColor = '#007bff';
    
    // Obtener la imagen y aplicarle un filtro (manipulación de estilos internos)
    const imagen = elemento.querySelector('img');
    if (imagen) {
        imagen.style.filter = 'grayscale(0%)';
        imagen.style.transform = 'scale(1.1)'; // Pequeño zoom suave
    }
    console.log("Tarjeta Portafolio resaltada (JS/this):", elemento.querySelector('.card-title').innerText);
}

/**
 * Normaliza los estilos de la tarjeta al hacer mouseout.
 * @param {HTMLElement} elemento - La tarjeta (div.card) que disparó el evento (this).
 */
function normalizarTarjeta(elemento) {
    // Restablecer estilos
    elemento.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    elemento.style.transform = 'scale(1)';
    elemento.style.borderColor = '#e0e0e0';

    const imagen = elemento.querySelector('img');
    if (imagen) {
        imagen.style.filter = 'grayscale(100%)'; // Opcional: volver a gris
        imagen.style.transform = 'scale(1)';
    }
}

/**
 * Función de demostración para remover una entrada de educación/experiencia.
 * Usa .closest() para encontrar el ancestro removible.
 * @param {HTMLElement} elementoBoton - El botón 'Eliminar (Demo)' que disparó el evento (this).
 */
function removerEntrada(elementoBoton) {
    if (confirm('¿Desea remover esta entrada de la lista? (Esta es una función demo con this)')) {
        // Encontramos el contenedor principal a remover (el ancestro más cercano con la clase)
        const contenedorPadre = elementoBoton.closest('.item-removible'); 
        
        if (contenedorPadre) {
            contenedorPadre.remove(); // Remueve el elemento del DOM
            console.log("Entrada removida exitosamente:", contenedorPadre);
        }
    }
}

/**
 * Función de ejemplo de interactividad onchange.
 * Valida el campo de correo electrónico al cambiar su contenido.
 * @param {HTMLInputElement} elementoInput - El campo de input de correo (this).
 */
function validarCorreo(elementoInput) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mensaje = document.getElementById('mensaje-validacion');
    
    if (regexCorreo.test(elementoInput.value)) {
        elementoInput.style.borderColor = 'green';
        mensaje.style.display = 'none';
        console.log("Correo válido ingresado.");
    } else {
        elementoInput.style.borderColor = 'red';
        mensaje.style.display = 'block';
        console.log("Correo inválido detectado.");
    }
}

/**
 * Función de ejemplo de onmouseover/onmouseout en el botón CTA.
 * @param {HTMLElement} elemento - El botón que disparó el evento (this).
 */
function resaltarBoton(elemento) {
    elemento.style.backgroundColor = '#0056b3';
    elemento.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.8)';
}

function normalizarBoton(elemento) {
    elemento.style.backgroundColor = '#007bff';
    elemento.style.boxShadow = 'none';
}

// ----------------------------------------------------
// Función para el Scroll Suave (Mejora la UX)
// ----------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ----------------------------------------------------
// Nueva funcionalidad: Fondo del Navbar al hacer scroll
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const mainNavbar = document.getElementById('mainNavbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Ajusta este valor si quieres que aparezca antes o después
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });
});