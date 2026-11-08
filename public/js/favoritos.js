//  favoritos.js - Datos de los favoritos guardados en localStorage.
//  Solo maneja los datos (leer, agregar, quitar). No toca el HTML.

const CLAVE = 'pokedex:favoritos';

// Lee del localStorage y devuelve un Set de ids. Si no hay nada, devuelve un Set vacío.
function leer() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE)) ?? []);
  } catch {
    return new Set();
  }
}

function escribir(conjunto) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
  } catch { /* Solo sigue en caso de */ }
}

export function listaFavoritos() {
  return [...leer()];
}

// Agrega los ids que lleguen. No agrega duplicados.
export function agregarAFavoritos(ids) {
  const favoritos = leer();
  ids.forEach((id) => favoritos.add(id));
  escribir(favoritos);
}

export function quitarDeFavoritos(id) {
  const favoritos = leer();
  favoritos.delete(id);
  escribir(favoritos);
}
