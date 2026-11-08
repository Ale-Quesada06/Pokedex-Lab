//  utilidades.js - Funciones compartidas por los módulos del
//  perfil de entrenador, para cumplir lo que pide el enunciado sobre modularidad del código


// Nombres que no salen solo con poner la primera letra en mayúscula.
const NOMBRES_TIPO = {
  electrico: 'Eléctrico',
  psiquico: 'Psíquico',
  dragon: 'Dragón',
};

// Devuelve el nombre de un tipo de Pokémon, con la primera letra en mayúscula
export function nombreTipo(tipo) {
  return NOMBRES_TIPO[tipo] ?? tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

// Arma las etiquetas de tipo de un Pokémon
export function htmlTipos(tipos) {
  return tipos
    .map((tipo) => `<span class="tipo tipo--${tipo}">${nombreTipo(tipo)}</span>`)
    .join('');
}

// Pinta los mini-sprites de los primeros 3 Pokémon en el contenedor, y si hay más, agrega un "+N" al final
export function pintarMiniSprites(contenedor, pokemones) {
  if (!contenedor) return;
  const primeros = pokemones.slice(0, 3)
    .map((p) => `<span><img src="assets/${p.slug}.png" alt="" width="34" height="34"></span>`)
    .join('');
  const resto = pokemones.length > 3
    ? `<span class="mini-sprites__mas">+${pokemones.length - 3}</span>` : '';
  contenedor.innerHTML = primeros + resto;
}

// Devuelve los ids de los Pokémon marcados en el modal de Capturados
export function idsSeleccionados() {
  const marcados = document.querySelectorAll('#modal-capturados .captura__check:checked');
  return [...marcados].map((casilla) => Number(casilla.value));
}

// Desmarca todas las casillas del modal de Capturados
export function limpiarSeleccion() {
  document.querySelectorAll('#modal-capturados .captura__check:checked')
    .forEach((casilla) => { casilla.checked = false; });
}

// Muestra un mensaje en el pie del modal de Capturados
export function mostrarAviso(texto) {
  const aviso = document.querySelector('#aviso-capturados');
  if (aviso) aviso.textContent = texto;
}
