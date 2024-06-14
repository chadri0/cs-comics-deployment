// dependencies/packages
require("dotenv").config(); 
require("./config/connection"); 
require("./config/authStrategy"); 
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors"); 
const helmet = require("helmet"); 
const session = require("express-session"); 
const passport = require("passport"); 

// middleware
app.use(morgan("dev"));

//CCS-3 define routing variables
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")));

// use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// utilize session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport and utilize session
app.use(passport.initialize());
app.use(passport.session());


//CCS-3 index route to initialize localhost:3000
app.get('/', (request, response, next) => {
  response.status(200).json({success: {message: "Index successful"}, statusCode: 200});
}); 

//CCS-3 tell app to .use() bookRoutes, "/api/books", authRoutes, and "/"
app.use("/api/books", bookRoutes);
app.use("/", authRoutes);


// CCS-1 5 GET routes
// app.get("/", (request, response, next) => {
//   // response.send("This route points to the Home page");
//   response.status(200).json({success: {message: "This route points to the Home page"}, statusCode: 200});
// });
// app.get("/about", (request, response, next) => {
//   // response.send("This route points to the About page");
//   response.status(200).json({success: {message: "This route points to the About page"}, statusCode: 200});
// });
// app.get("/login", (request, response, next) => {
//   // response.send("This route points to the Login page");
//   response.status(200).json({success: {message: "This route points to the Login page"}, statusCode: 200});
// });
// app.get("/admin", (request, response, next) => {
//   // response.send("This route points to the Admin Console page");
//   response.status(200).json({success: {message: "This route points to the Admin Console page"}, statusCode: 200});
// });
// app.get("/admin/create-book", (request, response, next) => {
//   // response.send("This route points to the Create Book page");
//   response.status(200).json({success: {message: "This route points to the Create Book page"}, statusCode: 200});
// });

// CCS-2 5 NEW GET routes (commented out after copy/pasting into bookRoutes.js file)
// app.get("/api/books", (request, response, next) => {
//   response.status(200).json({success: {message: "This will send all of the book data" }, statusCode:200})
// });
// app.get("/api/books/:id", (request, response, next) => {
//   response.status(200).json({success: {message: "This will send all of the books details data, or each book by their ID"}, statusCode:200})
// });
// app.get("/api/books/create/new", (request, response, next) => {
//   response.status(200).json({success: {message: "This will send all of the data that will have the ability to create new books"}, statusCode:200})
// });
// app.get("/api/books/edit/:id", (request, response, next) => {
//   response.status(200).json({success: {message: "This will send all of the update comic book form page data to modify a book by their ID"}, statusCode:200})
// });
// app.get("/api/books/delete/:id", (request, response, next) => {
//   response.status(200).json({success: {message: "This will send all of the data that will have the ability to delete a book by their ID"}, statusCode:200})
// });

// server
app.listen(PORT, () => {
  console.log(`CodeSquad Comics server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});