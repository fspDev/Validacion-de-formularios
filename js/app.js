// Importamos la función "valida" desde un archivo llamado "validaciones.js"
import { valida } from "./validaciones.js";

// Seleccionamos todos los elementos de "input" en la página
const inputs = document.querySelectorAll("input");

// Agregamos un evento "blur" a cada elemento de "input"
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    // Cuando se dispara el evento "blur", llamamos a la función "valida" y le pasamos el elemento de "input" como argumento
    valida(input);
  });
});
