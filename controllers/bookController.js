//CCS-4 Require the data.js that is in the data directory and set it to a constant of booksData
// const { request, response } = require("express");
// const booksData = require("../data/data");
const Book = require("../models/bookModel");

//CCS-4 getAllBooks function
const getAllBooks = async (request, response, next) => {
    await Book.find({}).then((books) =>
    response.status(200).json({
      success: { message: "This route points to the Books page with all of the books" },
      data: books,
      statusCode: 200,
    })
    )
};

//CCS-4 getBook function
const getBook = async (request, response, next) => {
    const { _id } = request.params;
  
      await Book.findOne({ _id: _id }).then((foundBook) => {
      response.status(200).json({
        success: { message: "This route points to the Books page with one of the books by the ID" },
        data: foundBook,
        statusCode: 200
      });  
    } 
    ) 
  };

//CCS-4 createBook function
const createBook = async (request, response, next) => {
    const {title, author, publisher, genre, pages, rating, synopsis} = request.body;
    const newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
        genre: genre,
        pages: pages,
        rating: rating,
        synopsis: synopsis,
    });

    try {
        await newBook.save();
        response.status(201).json({
            success: {message: "A new book is created"},
            data: newBook,
            statusCode: 201,
        });
    } catch (error) {
        response.status(400).json({
            error: {message: "Something went wrong creating a book!"},
            statusCode: 400,
        })
    }
};

//CCS-4 editBook function
const editBook = async (request, response, next) => {
    const {_id} = request.params;
    const {title, author, publisher, genre, pages, rating, synopsis} = request.body;

    try {
        await Book.findByIdAndUpdate({_id: _id,}, {
          $set: {
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis
          }  
        }, { new: true });

        response.status(201).json({
            success: {message: "Book is updated"},
            statusCode: 201,
        });
    } catch (error) {
        response.status(400).json({
            error: {message: "Something went wrong while editing the book~"},
            statusCode: 400,
        });
    }
};

//CCS-4 deleteBook function
const deleteBook = async (request, response, next) => {
    const {_id} = request.params;

    try {
        await Book.findByIdAndDelete({_id: _id});
        response.status(200).json({
            success: {message: "Book deleted successfully!"},
            statusCode: 200,
        });
    } catch (error) {
        response.status(400).json({
            error: {message: "Something went wrong while deleting the book!"},
            statusCode: 400,
        });
    }
};

//CCS-4 module exports
module.exports = {getAllBooks, getBook, createBook, editBook, deleteBook}