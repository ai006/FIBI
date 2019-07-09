// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const JobSchema = new Schema(
{
    id: Number,
    CompanyName: String,
    logo: String,
    address: {
        street: String,
        city: String,
        country: String,
    },
    link: String,
    jobs: String,
    about: String,
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Jobs", JobSchema);