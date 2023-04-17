// Exporta una función llamada "valida" que realiza validaciones en el input pasado como argumento y actualiza su estado de validez
export function valida(input) {
  
    // Extrae el tipo de input de los datos del dataset del input
    const tipoDeInput = input.dataset.tipo;
      // Si hay una función de validación para ese tipo de input en el objeto "validadores", llama la función de validación correspondiente con el input como argumento

    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
      // Verifica si el input es válido utilizando la propiedad "validity.valid"
    if (input.validity.valid) {
      
      // Si es válido, quita la clase "input-container--invalid" del elemento padre del input
      input.parentElement.classList.remove("input-container--invalid");
      // Borra cualquier mensaje de error que haya en ".input-message-error"
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      // Si no es válido, agrega la clase "input-container--invalid" al elemento padre del input
      input.parentElement.classList.add("input-container--invalid");
      // Actualiza el contenido de ".input-message-error" con un mensaje de error generado por la función "mostrarMensajeDeError"
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
  
  // Define una matriz llamada "tipoDeErrores" que contiene los tipos de errores que pueden ocurrir en un input
  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  // Define un objeto llamado "mensajesDeError" que contiene mensajes de error para cada tipo de input y tipo de error
  const mensajesDeError = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    password: {
      valueMissing: "El campo contraseña no puede estar vacío",
      patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
      valueMissing: "Este campo no puede estar vacío",
      customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El formato requerido es xxxxxxxxxx 10 números.",
    },
    direccion: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La dirección debe contener entre 10 y 40 caracteres.",
    },
    cuidad: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "La cuidad debe contener entre 10 y 40 caracteres.",
    },
    estado: {
      valueMissing: "Este campo no puede estar vacío",
      patternMismatch: "El estado debe contener entre 10 y 40 caracteres.",
    },
  };
  

  // Objeto que contiene las funciones de validación para cada tipo de entrada
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  // Función que muestra el mensaje de error correspondiente a un tipo de entrada
  function mostrarMensajeDeError(tipoDeInput, input) {
        let mensaje = "";
    // Recorre la lista de tipos de error posibles para una entrada
    tipoDeErrores.forEach((error) => {
      // Si el error actual está presente en la entrada, guarda su mensaje correspondiente
      if (input.validity[error]) {
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
  
  // Función de validación de fecha de nacimiento
  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    // Verifica si la fecha es mayor de 18 años
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    // Establece un mensaje de error personalizado en la entrada si corresponde
    input.setCustomValidity(mensaje);
  }
  
  // Función que verifica si una fecha es mayor de 18 años
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    // Crea una nueva fecha que representa la fecha de hace 18 años a partir de la fecha actual
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );

    // Verifica si la fecha de nacimiento más 18 años es anterior o igual a la fecha actual
    return diferenciaFechas <= fechaActual;
  }


