// /backend/userAddedSchema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The JSON format for user added jobs 
//similar to the Job schema from /backend/Schema.js
const addedJobSchema = new Schema(
{
    id: Number,
    CompanyName: String,
    educationLevel: String,   //education level (PhD, masters, or bachelors)
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