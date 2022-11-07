const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "ayalachadash12@gmail.com",
        pass: "ttrpkwcxgknolsbo",
    },
    tls: {
        rejectUnauthorized: false
      }
});
async function sendMailToNewMember(mail, name, txt) {
    console.log(txt)
    const options = {
        from: "ayalachadash12@gmail.com",
        to: mail,
        subject: " הי " + " - " + name,
        text: txt,
        attachments: [
            // {   
            //     filename: 'text1.txt',
            //     content: 'name'+name + mail
            // },
            {  
                path: 'recept from event click.pdf'
            }]
        
    }
    await transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err)
            return;
        }
        console.log("info: " + info.response);
    })
};

module.exports = {
    sendMailToNewMember,
 }