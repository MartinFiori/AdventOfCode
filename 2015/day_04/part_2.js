const crypto = require('crypto');

function findLowestNumber(secretKey) {
  let number = 0;

  while (true) {
    const hash = crypto.createHash('md5').update(secretKey + number).digest('hex');
    if (hash.startsWith('000000')) {
      return number;
    }
    number++;
  }
}

// Ejemplo de uso
const secretKey = "yzbqklnj"; // Reemplaza con tu clave secreta

const result = findLowestNumber(secretKey);
console.log(`El número más bajo que produce un hash con al menos 5 ceros es: ${result}`);
