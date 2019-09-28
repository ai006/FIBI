// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
//for the jobs that the user adds to be vetted later
const addedJobSchema = new Schema(
{
    id: Number,
    CompanyName: String,
    city: String,
    country: String,
    link: String,
    job: String,
    about: String,
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("userAddedJobs", addedJobSchema);