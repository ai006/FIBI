
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The JSON format for questions in DB 
//similar to the Job schema from /backend/Schema.js
const newsSchema = new Schema(
{
    source:{
        id : String,
        name : String
    },
    author : String,
    title : String,
    description : String,
    url : String,
    urlToImage : String,
    publishedAt : Date,
    content : String,
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("news", newsSchema);