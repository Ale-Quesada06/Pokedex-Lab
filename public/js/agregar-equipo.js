import { buscarPorId } from './datos.js';
import { agregarAlEquipo } from './equipo.js';
import { mostrarAviso, limpiarSeleccion, idsSeleccionados } from './utilidades.js';
import { pintarEquipo } from './pintar-equipo.js';

const btnAgregarEquipo = document.querySelector('#btn-agregar-equipo');
btnAgregarEquipo.addEventListener('click', agregarEquipo);

function agregarEquipo() {
  const ids = idsSeleccionados();

  if (ids.length === 0) {
    mostrarAviso('Seleccione al menos un Pokémon.');
    return;
  }

  const { agregados, rechazados } = agregarAlEquipo(ids);

  const mensajes = [];
  if (agregados.length > 0) {
    mensajes.push(`Se agregaron ${agregados.length} Pokémon al equipo.`);
  }
  if (rechazados.length > 0) {
    const nombres = rechazados.map((id) => buscarPorId(id)?.nombre ?? id).join(', ');
    mensajes.push(`El equipo está lleno. No se agregaron: ${nombres}.`);
  }
  if (mensajes.length === 0) {
    mensajes.push('Los Pokémon seleccionados ya estaban en el equipo.');
  }

  mostrarAviso(mensajes.join(' '));
  limpiarSeleccion();
  pintarEquipo();
}
