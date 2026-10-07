const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const router =express.Router();

const myOAuth2Client = new OAuth2(
  "",
  "",
  "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
    refresh_token:""
  });

const myAccessToken = myOAuth2Client.getAccessToken()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "", //your gmail account you used to set the project up in google cloud console"
       clientId: "",
       clientSecret: "",
       refreshToken: "",
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