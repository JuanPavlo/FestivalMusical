
document.addEventListener("DOMContentLoaded", function() {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

// PARA HACER LA BARRA DE NAVEGACION APARECER CADA CIERTO SCROLL
function navegacionFija() {
    const barra =document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");
    window.addEventListener("scroll", function() {
        if(sobreFestival.getBoundingClientRect().top<0){ // top y bottom es referente al elemento el elemento cuando toca con la parte de arriba del navegador el top o bottom del elemento
            barra.classList.add("fijo");    
            body.classList.add("body-scroll");    
        } else {
            barra.classList.remove("fijo");  
            body.classList.remove("body-scroll");  
        }
    });
}

// PARA HACER UN SCROLL MAS SUAVISADO
function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach( enlace => {
        enlaces.addEventListener("click", function(e) {
            // se debe prevenir la accion por defecto que hace el navegador
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        })
    }) 
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    for(let i=1; i <= 12; i++){
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img lazy="loading" width="200" height="300" src=build/img/thumb/${i}.jpg" alt="Imagen Galeria">
        `;
        imagen.onclick = function() { // onclick es al darle click
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img lazy="loading" width="200" height="300" src=build/img/grande/${id}.jpg" alt="Imagen Galeria">
    `;
    // CREA EL OVERLAY CON LA IMAGEN
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    //BOTON PARA CERRAR EL MODAL
    overlay.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    }
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);
    // SE AÑADE AL HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
} 


