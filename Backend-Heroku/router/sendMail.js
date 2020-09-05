const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const router =express.Router();

const myOAuth2Client = new OAuth2(
  "94774374589-g8gfue4jufg4t9q0qcgvkf4s490aeg7j.apps.googleusercontent.com",
  "j_QNcHw9ur8eTros_tbt9qHs",
  "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
    refresh_token:"1//04K5thE90_MdxCgYIARAAGAQSNwF-L9Ir97b6OV_dKT1TdlgolswD8M3F5ij_vFY90dXp41al9iPFBSJeMrCvkC41xg658A8wuLY"
  });

const myAccessToken = myOAuth2Client.getAccessToken()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "thierry.ishimwe@gmail.com", //your gmail account you used to set the project up in google cloud console"
       clientId: "94774374589-g8gfue4jufg4t9q0qcgvkf4s490aeg7j.apps.googleusercontent.com",
       clientSecret: "j_QNcHw9ur8eTros_tbt9qHs",
       refreshToken: "1//04K5thE90_MdxCgYIARAAGAQSNwF-L9Ir97b6OV_dKT1TdlgolswD8M3F5ij_vFY90dXp41al9iPFBSJeMrCvkC41xg658A8wuLY",
       accessToken: myAccessToken //access token variable we defined earlier
    },
  });


router.post('/sendmail', (req, res) => {

const {data , type} = req.body;

var message = ''
var subject = ''
//check which notification to make
if(type === 'job'){    //notification for jobs
  subject = 'new job posted'
  message = 
    `<p> New Job posting </p>
      <h3> Job descriptions </h3>
        <ul>
            <li>company Name: ${data.CompanyName} </li>
            <li>job: ${data.job} </li>
            <li>link: ${data.link} </li>
            <li>City: ${data.city} </li>
            <li>Country: ${data.country} </li>
        </ul>
      <h3>About</h3>
    <p>${data.about}</p>
    `;
}
else if(type === 'forum'){  //notification for forum

  var email = 'not specified'
  if(data.email !== undefined){
    email = data.email
  }

  subject = 'forum update'
  message = `<p> New Forum update</p>
              <h3> inquiry descriptions </h3>
                <ul>
                    <li>id: ${data.id} </li>
                    <li>title: ${data.title} </li>
                    <li>inquiry: ${data.inquiry} </li>
                    <li>email: ${email} </li>
                </ul>`;
}
else if(type === 'help'){
  subject = `${data.title}`
  message = `<p> New Feedback</p>
              <h3> inquiry descriptions </h3>
                <ul>
                    <li>description: ${data.body} </li>
                </ul>`;

} 
 


  let mailOptions = {
    from: '"FIBI" <thierry.ishimwe@gmail.com>', // sender address
    to: 'thierry.ishimwe@gmail.com',  // list of receivers
    subject: subject, // Subject line
    //text: themessage, // plain text body
    html: message
  }
  transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
        res.send({success: false, error: err })
    }
    else{
        res.send({success:true})
    }
    

  });
});

 module.exports = router;