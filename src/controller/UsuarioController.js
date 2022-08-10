import UsuarioDAO from '../DAO/UsuarioDAO.js';

export const Usuarios = app => {
  app.get('/usuarios', (request, response) => {
    response.send('Rota usuários em funcionamento');
  });
};
