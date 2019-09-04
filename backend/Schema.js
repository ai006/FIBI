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
        city: String,
        cityArr: Array,
        country: String,
        countryArr: Array,
    },
    link: String,
    jobs: String,
    jobsArr: Array,
    about: String,
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Jobs", JobSchema);