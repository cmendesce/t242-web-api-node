import * as express from 'express';
import Categoria, { ICategoria } from './categoria.model';

const router = express.Router();

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

router.get('/categorias', async (_, res) => {
    try {
        const result: ICategoria[] = await Categoria.find();
        console.log(result);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

router.get('/categorias/:id', async (req, res) => {
    const result = await Categoria.findById(req.params['id']);
    res.send(result);
});

router.post('/categorias',  async (req, res) => {
    try {
    const created = await Categoria.create({
        name: req.body.nome
    });
    
    res.status(201)
        .header('Location', `/categorias/${created.id}`)
        .send();
    } catch (e) {
        console.log(e);
    }
});

router.put('/categorias/:id', (req, res) => {
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

router.delete('/categorias/:id',  async (req, res) => {
    try {
        console.log(req.params['id']);
        const result = await Categoria.deleteOne({_id: req.params['id']});
        console.log(result);
        res.status(204).send();
    } catch (e) {
        console.log(e);
    }
});

export { router };


