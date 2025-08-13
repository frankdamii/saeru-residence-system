const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Por favor, proporciona una contraseña.');
  console.log('Uso: node hash-password.js <tu_contraseña>');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Tu contraseña hasheada es:');
console.log(hash);