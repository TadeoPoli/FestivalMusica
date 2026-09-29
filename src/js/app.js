document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}
function crearGaleria() {
    const cantidadImagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= cantidadImagenes; i++) {
        const imagen = document.createElement('button');
        imagen.type = 'button';
        imagen.classList.add('galeria-imagen');
        imagen.setAttribute('aria-label', `Ampliar imagen ${i} de la galería`);
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="Imagen ${i} de la galería">
        `;

        imagen.addEventListener('click', () => mostrarImagen(i));
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img src="build/img/gallery/full/${i}.jpg" alt="Imagen ampliada ${i} de la galería">
    `;

    const modal = document.createElement('div');
    const closeButton = document.createElement('button');
    const body = document.body;

    modal.classList.add('modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', `Imagen ${i} de la galería`);

    closeButton.type = 'button';
    closeButton.textContent = '×';
    closeButton.classList.add('btn-cerrar');
    closeButton.setAttribute('aria-label', 'Cerrar imagen ampliada');

    const cerrarConEscape = (event) => {
        if (event.key === 'Escape') {
            cerrarModal();
        }
    };

    const cerrarModal = () => {
        modal.classList.add('fadeOut');
        document.removeEventListener('keydown', cerrarConEscape);

        window.setTimeout(() => {
            modal.remove();
            body.classList.remove('overflow-hidden');
        }, 500);
    };

    closeButton.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal();
        }
    });
    document.addEventListener('keydown', cerrarConEscape);

    modal.append(imagen, closeButton);
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
    closeButton.focus();
}

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.currentTarget.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({ behavior: 'smooth' })


        })
    })
}
