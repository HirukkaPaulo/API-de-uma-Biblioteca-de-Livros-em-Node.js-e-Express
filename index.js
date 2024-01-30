const express = require('express');
const app = express();
const livroModel = require('./src/module/Books/books.model.js')
const cors = require('cors')
const connection = require('./src/config/mongo.js')
app.use(cors());
app.use(express.json());

connection();

app.get('/livros', async (req,res) => {
    let filtroLivro = {};
    if(req.query.title ){
        filtroLivro = { title: req.query.title };
    }
    if(req.query._id){
        filtroLivro = { _id: req.query._id };
    }
    
    const livroProcurado = await livroModel.find(filtroLivro);
    
    if(livroProcurado == ''){
        return res.status(404).json({msg: "Não existe nenhum livro com este título ou Id no Banco de Dados."})
    }

    return res.status(200).json(livroProcurado);
})


app.post('/livros/cadastro', async (req,res) => {
    if(!req.body.id){
        return res.status(400).json([{message: "O campo id é obrigatório"}])
    }
    if(!req.body.title){
        return res.status(400).json([{message: "O campo Título é obrigatório"}])
    }
    
    if(!req.body.pages){
        return res.status(400).json([{message: "O campo Número de Páginas é obrigatório"}])
    }

    if(!req.body.isbn){
        return res.status(400).json([{message: "O campo ISBN é obrigatório"}])
    }

    if(!req.body.pb){
        return res.status(400).json([{message: "O campo Editora é obrigatório"}])
    }
    
    const livroExistente = await livroModel.find({ title: req.body.title});
    
    if(livroExistente.length){
        res.status(400).json([{message: "O livro com o título digitado já existe"}]);
    }else{
        const livro = await livroModel.create({
            id: req.body.id,
            title: req.body.title,
            pages: req.body.pages,
            isbn: req.body.isbn,
            pb: req.body.pb
        })
    }
    const listaAtualizada = await livroModel.find({})   
    return res.status(201).json(listaAtualizada)
})

app.put('/livros/edicao/:id', async (req,res) => {
    if(!req.body.title){
        return res.status(400).json([{message: "O campo Título é obrigatório"}])
    }
    
    if(!req.body.pages){
        return res.status(400).json([{message: "O campo Número de Páginas é obrigatório"}])
    }
    if(!req.body.isbn){
        return res.status(400).json([{message: "O campo ISBN é obrigatório"}])
    }
    if(!req.body.pb){
        return res.status(400).json([{message: "O campo Editora é obrigatório"}])
    }
    
    const id = req.params.id;
    const novoValor = { 
        title: req.body.title,
        pages:req.body.pages,
        isbn:req.body.isbn,
        pb:req.body.pb
    };
    try {
        const livroAtualizado = await livroModel.findByIdAndUpdate(id,novoValor,
          { new: true }
        );
    
        if (livroAtualizado) {
          res.json(livroAtualizado);
        } else {
          res.status(404).json({ mensagem: 'Livro não encontrado.' });
        }
      } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
      }
    
});
    
app.delete('/livros/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const livroAtualizado = await livroModel.findByIdAndDelete(id);
    
        if (livroAtualizado) {
          res.json(livroAtualizado);
        } else {
          res.status(404).json({ mensagem: 'Livro não encontrado.' });
        }
      } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
      }
})

app.listen(8080, () => {
    console.log('servidor funcionando na porta 8080')
})