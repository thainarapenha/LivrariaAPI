import sqlite3 from 'sqlite3';

const bd = new sqlite3.Database('./src/data/database.db', erro => {
  if (erro) {
    console.log(erro);
  } else {
    console.log('Banco de dados conectado com sucesso.');
  }
});

process.on('SIGINT', () => {
  bd.close(erro => {
    if (erro) {
      console.log(erro);
    } else {
      console.log('Banco de dados desconectado com sucesso.');
      process.exit(0);
    }
  });
});

export default bd;
