// /backend/userAddedSchema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The JSON format for questions in DB 
//similar to the Job schema from /backend/Schema.js
const forumSchema = new Schema(
{
    id: Number,
    title: String,
    inquiry: String,
    comments: Array,
    approved: Boolean,
    show: Boolean,
    category: String
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("forumquestions", forumSchema);