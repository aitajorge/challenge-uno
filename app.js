var formulario = document.getElementById("formulario");
var texto = document.getElementById("texto");
var encriptar = document.getElementById("encriptar");
var decryptar = document.getElementById("decryptar");
var resultado = document.getElementById("resultado");
var copiar = document.getElementById("copiar");

var clave = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat"
};

encriptar.addEventListener("click", function() {
  var valorTexto = texto.value;
  var resultadoEncriptado = encriptarTexto(valorTexto);
  resultado.innerHTML = resultadoEncriptado;
});

decryptar.addEventListener("click", function() {
  var valorTexto = texto.value;
  var resultadoDesencriptado = desencriptarTexto(valorTexto);
  resultado.innerHTML = resultadoDesencriptado;
});

function encriptarTexto(texto) {
  texto = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  var textoEncriptado = "";
  for (var i = 0; i < texto.length; i++) {
    var letra = texto[i];
    var letraClave = clave[letra] || letra;
    textoEncriptado += letraClave;
  }
  return textoEncriptado;
}

function desencriptarTexto(texto) {
  var textoDesencriptado = "";
  var palabraActual = ""; 

  for (var i = 0; i < texto.length; i++) {
    var caracter = texto[i];

    if (Object.values(clave).includes(caracter)) {
      palabraActual += caracter;

      if (Object.values(clave).includes(palabraActual)) {
        textoDesencriptado += Object.keys(clave).find(key => clave[key] === palabraActual) || palabraActual;
        palabraActual = "";
      }
    } else {
      textoDesencriptado += caracter;
      palabraActual = "";
    }
  }

  return textoDesencriptado;
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  var valorTexto = texto.value;
  if (encriptar.checked) {
    var resultadoEncriptado = encriptarTexto(valorTexto);
    resultado.innerHTML = resultadoEncriptado;
  } else if (decryptar.checked) {
    var resultadoDesencriptado = desencriptarTexto(valorTexto);
    resultado.innerHTML = resultadoDesencriptado;
  } else {
    alert("Por favor, selecciona una opción: encriptar o decryptar");
  }
});

copiar.addEventListener("click", function() {
  var textoResultado = resultado.textContent;
  navigator.clipboard.writeText(textoResultado)
    .then(function() {
      alert("El texto se ha copiado al portapapeles correctamente.");
    })
    .catch(function(err) {
      console.error("Error al copiar el texto: ", err);
      alert("Error al intentar copiar el texto al portapapeles.");
    });
});





