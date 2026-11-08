import {buscarPorId, numeroPokedex} from './datos.js';
import { pintarMiniSprites } from './utilidades.js';
const CLAVE = 'pokedex:favoritos';

function leer() {
    try {
        return new Set(JSON.parse(localStorage.getItem(CLAVE) ?? '[]'));
    }catch {
        return new Set();
    }
}

function escribir(favoritos) {
    try{
        localStorage.setItem(CLAVE, JSON.stringify([...favoritos]));
    } catch {

    }
}

function nombreTipo(tipo){
    const nombres = {
        electrico: 'Eléctrico'
    };

    if (nombres[tipo]) return nombres[tipo];

    return tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

function pintarFavoritos() {
    const favoritos = [...leer()].map(buscarPorId).filter(Boolean).sort((a,b) => a.id - b.id);
    const lista = document.querySelector('#lista-favoritos');
    const contador = document.querySelector('#favoritos-contador');
    const mini = document.querySelector('.seccion--favoritos .mini-sprites');

    contador.textContent = `${favoritos.length} Pokémon marcados como favoritos`;

    pintarMiniSprites(mini, favoritos);
    if (favoritos.length === 0) {
        lista.innerHTML = '<li class="favoritos__vacio">Todavía no capturaste ninguno. Entrá a la Pokédex y tocá “Capturar”.</li>';
        return;
    }

    lista.innerHTML = favoritos.map((p) => {
        const tipos = p.tipos.map((tipo) => `<span class="tipo tipo--${tipo}" >${nombreTipo(tipo)}</span>`).join('');
        
        return `
            <li class="favorito">
                <span class="favorito__estrella">
                <svg class="icono icono--fav"
                    aria-hidden="true"
                    width="24"
                    height="24">
                    <use href="#i-star"/>
                </svg>
                </span>

                <div class="sprite-zona sprite-zona--chica">
                <img src="assets/${p.slug}.png"
                    alt="${p.nombre}"
                    width="64"
                    height="64">
                </div>

                <div class="favorito__datos">
                <h3>
                    ${p.nombre}
                    <span class="numero">${numeroPokedex(p.id)}</span>
                </h3>

                <span class="tipos">${tipos}</span>
                </div>

                <div class="favorito__acciones">
                <a class="boton boton--borde-azul boton--chico"
                    href="detalle.html?id=${p.id}">
                    Ver detalle
                    <svg class="icono"
                        aria-hidden="true"
                        width="24"
                        height="24">
                    <use href="#i-arrow"/>
                    </svg>
                </a>

                <button type="button"
                        class="boton boton--borde-rojo boton--chico"
                        data-quitar-favorito="${p.id}">
                    Quitar de favoritos
                    <span class="solo-lectores">: ${p.nombre}</span>
                </button>
                </div>
            </li>
            `;
    }).join('');
}

function agregarFavoritos() {
        const seleccionados = document.querySelectorAll('#modal-capturados .captura__check:checked');

        if (seleccionados.length === 0) {
            alert('Selecciona al menos un Pokémon');
            return;
        }

        const favoritos = leer();

        seleccionados.forEach((checkbox) => {
            const id = Number(checkbox.id.replace('cap-', ''));
            favoritos.add(id);
        });

        escribir(favoritos);
        pintarFavoritos();
}

const lista = document.querySelector('#lista-favoritos');
lista.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-quitar-favorito]');
    if(!boton) {
        return;
    }

    const id = Number(boton.dataset.quitarFavorito);
    const favoritos= leer();
    favoritos.delete(id);
    escribir(favoritos);
    pintarFavoritos();
});

const botonFavorito = document.querySelector('#btn-marcar-favorito');

botonFavorito.addEventListener('click', agregarFavoritos);

pintarFavoritos();