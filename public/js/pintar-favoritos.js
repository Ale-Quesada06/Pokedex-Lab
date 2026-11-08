import { buscarPorId, numeroPokedex } from './datos.js';
import { listaFavoritos, agregarAFavoritos, quitarDeFavoritos } from './favoritos.js';
import { htmlTipos, pintarMiniSprites, idsSeleccionados, limpiarSeleccion, mostrarAviso } from './utilidades.js';

// Arma la ficha de un Pokémon favorito
function htmlFavorito(p) {
  return `
    <li class="favorito">
      <span class="favorito__estrella"><svg class="icono icono--fav" aria-hidden="true" width="24" height="24"><use href="#i-star"/></svg></span>
      <div class="sprite-zona sprite-zona--chica"><img src="assets/${p.slug}.png" alt="" width="64" height="64"></div>
      <div class="favorito__datos">
        <h3>${p.nombre} <span class="numero">${numeroPokedex(p.id)}</span></h3>
        <span class="tipos">${htmlTipos(p.tipos)}</span>
      </div>
      <div class="favorito__acciones">
        <a class="boton boton--borde-azul boton--chico" href="detalle.html?id=${p.id}">Ver detalle <svg class="icono" aria-hidden="true" width="24" height="24"><use href="#i-arrow"/></svg></a>
        <button type="button" class="boton boton--borde-rojo boton--chico" data-quitar-favorito="${p.id}">Quitar de favoritos<span class="solo-lectores">: ${p.nombre}</span></button>
      </div>
    </li>`;
}

export function pintarFavoritos() {
  const favoritos = listaFavoritos().map(buscarPorId).filter(Boolean).sort((a, b) => a.id - b.id);

  // Resumen y mini-sprites de la tarjeta del perfil
  const detalle = document.querySelector('.seccion--favoritos .seccion__detalle');
  if (detalle) detalle.textContent = `${favoritos.length} Pokémon marcados`;
  pintarMiniSprites(document.querySelector('.seccion--favoritos .mini-sprites'), favoritos);

  const contador = document.querySelector('#favoritos-contador');
  if (contador) contador.textContent = `${favoritos.length} Pokémon marcados como favoritos`;

  const lista = document.querySelector('#lista-favoritos');
  if (!lista) return;

  if (favoritos.length === 0) {
    lista.innerHTML = '<li class="favoritos__vacio">Todavía no tenés favoritos. Marcá Pokémon desde tus capturados.</li>';
    return;
  }
  lista.innerHTML = favoritos.map(htmlFavorito).join('');
}

// Quitar: se escucha en la lista porque las fichas se recrean
const lista = document.querySelector('#lista-favoritos');
if (lista) {
  lista.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-quitar-favorito]');
    if (!boton) return;
    quitarDeFavoritos(Number(boton.dataset.quitarFavorito));
    pintarFavoritos();
  });
}

const botonFavorito = document.querySelector('#btn-marcar-favorito');
if (botonFavorito) {
  botonFavorito.addEventListener('click', () => {
    const ids = idsSeleccionados();
    if (ids.length === 0) {
      mostrarAviso('Seleccione al menos un Pokémon.');
      return;
    }
    agregarAFavoritos(ids);
    mostrarAviso(`Se marcaron ${ids.length} Pokémon como favoritos.`);
    limpiarSeleccion();
    pintarFavoritos();
  });
}

pintarFavoritos();
