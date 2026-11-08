//  equipo.js - Datos del equipo Pokémon guardados en localStorage.
//  Solo maneja los datos (leer, agregar, quitar). No toca el HTML:

const CLAVE = 'pokedex:equipo';

// 6 pokemones como máximo
export const MAXIMO_EQUIPO = 6;

// Lee del localStorage y devuelve un Set de ids. Si no hay nada, devuelve un Set vacío.
function leer() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE)) ?? []);
  } catch {
    return new Set();
  }
}

// Guarda el Set en localStorage
function escribir(conjunto) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
  } catch { /* Solo sigue en caso de */ }
}

// Devuelve los ids del equipo en el orden en que se agregaron
export function listaEquipo() {
  return [...leer()];
}

export function estaEnEquipo(id) {
  return leer().has(id);
}

// Agrega los ids que quepan. Devuelve cuáles entraron y cuáles no, por superar el máximo. No agrega duplicados.
export function agregarAlEquipo(ids) {
  const equipo = leer();
  const agregados = [];
  const rechazados = [];

  ids.forEach((id) => {
    if (equipo.has(id)) return;
    if (equipo.size >= MAXIMO_EQUIPO) {
      rechazados.push(id);
    } else {
      equipo.add(id);
      agregados.push(id);
    }
  });

  escribir(equipo);
  return { agregados, rechazados };
}

export function quitarDelEquipo(id) {
  const equipo = leer();
  equipo.delete(id);
  escribir(equipo);
}
