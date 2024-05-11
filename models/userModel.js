// CCS-6: Open userModel.js in VSCode and require Mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

// CCS-6: Create a new variable called userSchema. As a value, make a new Schema. To do this, use the new keyword and have mongoose connect to the Schema() method using dot notation
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: Buffer,
    },
    salt: {
        type: Buffer,
    },
    strategy: {
        type: String,
        required: true,
    },
});

// CCS-6: Create a new variable called User that has the Mongoose model as the value. The model should be able to create a collection called ‘User’ and also use the userSchema for the collection structure
const User = mongoose.model("User", userSchema);

// CCS-6: Make sure to export User so that it can be used around the application itself
module.exports = User;