const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer');
const path = require('path')

const app = express();
var PORT = process.env.port || 3000;
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use('./public', express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'anothertoken,Accept,token ,Content-Type ');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req,res)=> {
    res.render('contact');
});

app.post('/sendEmail' , (req,res) => {
    console.log('Email request with body : ' +req.body)
    const output = `
    <p>You have a new contact request for your profile</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name : ${req.body.name} </li>
        <li>Mobile : ${req.body.mobile} </li>
        <li>email : ${req.body.email} </li>
        <li>Message : ${req.body.message} </li>
    </ul>
    `;
    let transporter = nodemailer.createTransport({
        pool : true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,  
        auth: {
          user: "nodemailernik@gmail.com", 
          pass: "nodemailer@123" 
        } 
      });
 
        
      let mailOptions = {
        from: '"Nikhil Desu Website" <nodemailernik@gmail.com>',
        to: "nikhildesu.3289@gmail.com, dipikachoclate@gmail.com", 
        subject: "Interested in Hiring you: Contact Request",
        text: "Hello", 
        html: output
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
    });
})


app.listen(PORT, () => console.log('Server started'))