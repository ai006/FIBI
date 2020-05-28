// /backend/Schema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
//The schema contains all the information used for a job
const JobSchema = new Schema(
{
    id: Number,
    CompanyName: String,      //company name
    logo: String,             //url address of image
    educationLevel: String,   //education level (PhD, masters, or bachelors)
    hire: String,
    hireArr: Array,
    address: {                 
        city: String,         //long strig cities with a delemeter e.g. "texas, Montana, New york"
        cityArr: Array,       //array of the cities e.g [ texas, Montana, new york]
        country: String,      //long strig countries with a delemeter e.g. "USA, Canada"
        countryArr: Array,    //array of the string of countries above  e.g [ usa, canada]
    }, 
    link: String,             //url link to job website
    jobs: String,             //the jobs that they hire e.g. IT, marketing 
    jobsArr: Array,           //array of the string of jobs [IT, marketing]
    about: String,            //details about the job what they do etc
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Jobs", JobSchema);