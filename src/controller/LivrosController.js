// import DAO from path

export const Livros = app => { 
    app.get('/livros', (request, response) => { 
        response.send('Rota livros em funcionamento')
    })
}
