const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));


const contactEmail = nodemailer.createTransport({
  pool: true,
  host: "127.0.0.1",
  port: 465,
  secure: true,
  service: 'protonmail',
  auth: {
    user: "p.ruban17@protonmail.com",
    pass: "Rubans@1720",
  },
 
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
})



router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "p.ruban17@protonmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Email: ${subject}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });
  