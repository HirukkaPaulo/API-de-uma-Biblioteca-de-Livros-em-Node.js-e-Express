const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    pages: String,
    isbn: String,
    pb: String,
  }, 
  { 
    timestamps: true 
}
);

const LivroModel = mongoose.model('Books', bookSchema);

module.exports = LivroModel;