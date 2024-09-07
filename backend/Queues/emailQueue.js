const Queue = require('bull');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailQueue = new Queue('emailQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const generateEmailTemplate = (title, author, description, coverImage) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
      <h1 style="text-align: center; color: #4CAF50;">New Manga Released!</h1>
      <div style="text-align: center;">
        <img src="${coverImage}" alt="${title}" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
      </div>
      <h2>${title}</h2>
      <h3>by ${author}</h3>
      <p>${description}</p>
      <div style="text-align: center;">
        <a href="https://tempestmanga.online" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Read Now</a>
      </div>
    </div>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
      © 2024 Manga Hub. All rights reserved.
    </footer>
  </div>
`;

emailQueue.process(async (job, done) => {
  const { email, subject, title, author, description, coverImage } = job.data;
  const html = generateEmailTemplate(title, author, description, coverImage);

  const mailOptions = {
    from: 'Manga Hub <no-reply@yourdomain.com>',
    to: email,
    subject: subject,
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    done();
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    done(error);
  }
});

module.exports = emailQueue;
