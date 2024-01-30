
const mongoose = require('mongoose');
const connectdDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://JoaoPaulo:tsmbjergsen123@api-biblioteca.ceke1rz.mongodb.net/?retryWrites=true&w=majority');
        console.log('Conectado')
    }
    catch (error) {
        console.log('Não conectou' + error)
    }
} 


module.exports = connectdDB;