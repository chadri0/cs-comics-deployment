//CCS-3 require express and express.router()
const express = require("express");
const router = express.Router();

//CCS-3 copy pasta all "/api/books" routes, remove "/api/books" prefix and replace with corresponding paths. Change method names to ensure functionality
router.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "This will send all of the book data" }, statusCode:200})
});
router.get("/:id", (request, response, next) => {
  response.status(200).json({success: {message: "This will send all of the books details data, or each book by their ID"}, statusCode:200})
});
router.post("/create", (request, response, next) => {
  response.status(200).json({success: {message: "This will send all of the data that will have the ability to create new books"}, statusCode:200})
});
router.put("/edit/:id", (request, response, next) => {
  response.status(200).json({success: {message: "This will send all of the update comic book form page data to modify a book by their ID"}, statusCode:200})
});
router.delete("/edit/:id", (request, response, next) => {
  response.status(200).json({success: {message: "This will send all of the data that will have the ability to delete a book by their ID"}, statusCode:200})
});

//export router
module.exports = router;