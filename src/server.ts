import express from 'express';
import bodyParser from 'body-parser';


const server = express();
server.use(
    bodyParser.json()
);

/**
 * 
 * get     - recuperar dados
 * post    - enviar ~> salvar dados
 * put     - enviar ~> atualizar dados
 * delete  - remover dados
 * 
 */

const categorias = [
    { id: 1, nome: 'Categoria 1' },
    { id: 2, nome: 'Categoria 2' },
    { id: 3, nome: 'Categoria 3' },
    { id: 4, nome: 'Categoria 4' }
];

server.get('/categorias', (_, res) => {
    res.send(categorias);
});

server.get('/categorias/:id', (req, res) => {
    const id = parseInt(req.params['id']);
    const categoriaFiltrada = categorias.filter(c => c.id === id);
    if (categoriaFiltrada.length > 0) {
        res.send(categoriaFiltrada);
    } else {
        res.status(404).send();
    }
});

server.post('/categorias', (req, res) => {
    const categoria = req.body;
    categorias.push(categoria);
    res.status(201)
        .header('Location', `/categorias/${categoria.id}`)
        .send();
});


server.put('/categorias/:id', (req, res) => {
    const id = parseInt(req.params['id']);
    const index = categorias.findIndex(c => c.id === id);
    
    if (index >= 0) {
        if (req.body['nome']) {
            categorias[index].nome = req.body['nome'];
            res.status(204).send();
        } else {
            res.status(400).send({
                mensagem: 'Informe um valor para nome'
            });
        }
    } else {
        res.sendStatus(404);
    }
});

server.delete('/categorias/:id', (req, res) => {
    const id = parseInt(req.params['id']);
    const index = categorias.findIndex(c => c.id === id);
    if (index >= 0) {
        categorias.splice(index, 1);
        console.log(categorias);
    }
    res.status(204).send();
});


export default server;
