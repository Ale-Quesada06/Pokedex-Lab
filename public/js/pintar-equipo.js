import { buscarPorId, numeroPokedex } from './datos.js';
import { listaEquipo, quitarDelEquipo, MAXIMO_EQUIPO } from './equipo.js';
import { htmlTipos, pintarMiniSprites } from './utilidades.js';

// Arma la ficha de un Pokémon del equipo
function htmlFicha(p) {
  return `
    <li class="equipo__ficha">
      <div class="sprite-zona">
        <span class="numero">${numeroPokedex(p.id)}</span>
        <img src="assets/${p.slug}.png" alt="" width="96" height="96">
      </div>
      <h3>${p.nombre}</h3>
      <span class="tipos">${htmlTipos(p.tipos)}</span>
      <button type="button" class="boton boton--borde-rojo boton--chico" data-quitar-equipo="${p.id}">
        <svg class="icono" aria-hidden="true" width="24" height="24"><use href="#i-minus"/></svg>
        Quitar<span class="solo-lectores"> a ${p.nombre} del equipo</span>
      </button>
    </li>`;
}

// Arma un espacio libre del equipo
function htmlLibre() {
  return `
    <li class="equipo__libre">
      <svg class="icono" aria-hidden="true" width="24" height="24"><use href="#i-plus"/></svg>
      <span>Espacio libre</span>
    </li>`;
}

export function pintarEquipo() {
  // Ids guardados -> fichas completas (se descartan ids raros)
  const equipo = listaEquipo().map(buscarPorId).filter(Boolean);
  const ocupados = equipo.length;
  const libres = MAXIMO_EQUIPO - ocupados;
  const texto = `${ocupados} de ${MAXIMO_EQUIPO} espacios ocupados`;

  // Contador y mensaje de espacios disponibles dentro del modal
  const contador = document.querySelector('#equipo-contador');
  if (contador) {
    contador.textContent = ocupados === 0
      ? `${texto}. Todavía no hay nadie en tu equipo.`
      : `${texto}. ${libres === 0 ? 'Equipo completo.' : `Quedan ${libres} disponibles.`}`;
  }

  // Resumen y mini-sprites de la tarjeta del perfil
  const detalle = document.querySelector('.seccion--equipo .seccion__detalle');
  if (detalle) detalle.textContent = texto;
  pintarMiniSprites(document.querySelector('.seccion--equipo .mini-sprites'), equipo);

  // Lista del modal: fichas + espacios libres (o mensaje de vacío)
  const lista = document.querySelector('#lista-equipo');
  if (!lista) return;

  if (ocupados === 0) {
    lista.innerHTML = '<li class="equipo__vacio">Todavía no tenés a nadie en tu equipo. Agregá Pokémon desde tus capturados.</li>';
    return;
  }
  lista.innerHTML = equipo.map(htmlFicha).join('')
    + Array.from({ length: libres }, htmlLibre).join('');
}

// Quitar: se escucha en la lista porque las fichas se recrean
const lista = document.querySelector('#lista-equipo');
if (lista) {
  lista.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-quitar-equipo]');
    if (!boton) return;
    quitarDelEquipo(Number(boton.dataset.quitarEquipo));
    pintarEquipo();
  });
}

pintarEquipo();