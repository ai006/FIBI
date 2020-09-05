
const express = require('express');


const forumSchema = require('../../forumSchema');

//initialize the router
const router = express.Router();

/* this is our create method, this method adds 
new data sent by the user to our database.
*/
router.post('/addForumData', (req, res) => {
    
    const {data , type} = req.body;

    let _id = data._id;
    if (data.title.length < 1 && data.inquiry.length < 1) {    //check to make  sure the company name is longer than 
       return res.json({                                        //one character, if company name is 0 return 
         success: false,                                        //error message
         error: 'MISSING TITLE AND INQUIRY',
       });
    }
    /*check if it is an answer to a question
    if so just overwrite the question object using its id*/
    if(type === 'answer'){

        forumSchema.findByIdAndUpdate( _id, data, (err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
          });
    }
    
    /* check if it is a question in the forum
    if so make a new forumSchema to send data to the DB*/
    else if(type === 'question'){
        let question  = new forumSchema();

        question.id = data.id;                     //update the user added database
        question.title = data.title;
        question.inquiry = data.inquiry;
        question.comments = data.comments;
        question.approved = data.approved;
        question.show = data.show;
        question.category = data.category;
        
        question.save((err) => {                     //save to database and return true
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
        });
    }
    
  });

  module.exports = router;  