const CLAVE = 'pokedex:favoritos';

function leer() {
    try {
        return new Set(JSON.parse(localStorage.getItem(CLAVE) ?? '[]'));

    }catch {

        return new Set();
    }
}

function escribir(conjunto) {
    try{
        localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
    } catch {

    }
}

export function agregarFavoritos(ids) {
    const favoritos = leer();
    ids.forEach((id) => {
        favoritos.add(id);
    });
    escribir(favoritos);
}