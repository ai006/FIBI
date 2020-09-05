// /backend/userAddedSchema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The JSON format for user added jobs 
//similar to the Job schema from /backend/Schema.js
const jobTypesSchema = new Schema(
{
    id: Number,
    occupation: String,
    questions: String,
    jobs: String,
    speacial:Boolean,
    emoji:String,
    displayRight:String,
},
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("currentjobs", jobTypesSchema);