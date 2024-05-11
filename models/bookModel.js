// CCS-6: Open bookModel.js in VSCode and require Mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

// CCS-6: Create a new variable called bookSchema. As a value, make a new Schema. To do this, use the new keyword and have mongoose connect to the Schema() method using dot notation
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
    },
    image: {
        type: String,
    },
});

// CCS-6: Create a new variable called Book that has the Mongoose model as the value. The model should be able to create a collection called ‘Book’ and also use the bookSchema for the collection structure
const Book = mongoose.model("Book", bookSchema);

// CCS-6: Make sure to export Book so that it can be used around the application itself
module.exports = Book;