/*CCS-6: Use Mongoose to connect to MongoDB Community via your application .First, make a new folder called config and make a file called connection.js. Open connection.js in VSCode and require Mongoose. Use mongoose.connect() to make your connection to your local MongoDB server. For the first parameter of the connect() method, put in the path of an empty string and then comment that line out so you do NOT push sensitive info out to GitHub. The line should be await mongoose.connect("")*/
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB is connected");
};
