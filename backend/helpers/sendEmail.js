const nodemailer = require("nodemailer");
const ejs = require('ejs');


let sendEmail = async ({view,data,from,to,subject}) => {
    try{
        var transport = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        });

      let dataString = await ejs.renderFile('./views/'+view+'.ejs',data);
      const info = await transport.sendMail({
        from,
        to,
        subject,
        html: dataString, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }catch(e) {
      throw new Error(e);
    }
}

module.exports = sendEmail;