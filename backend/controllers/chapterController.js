const { default: mongoose } = require('mongoose');
const Chapter = require('../models/Chapter');
const Manga = require('../models/Manga');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465, // Use 587 for TLS
  secure: true, // Use false for TLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App password
  },
});

const generateChapterEmailTemplate = (title, mangaTitle, number, coverImage) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
      <h1 style="text-align: center; color: #4CAF50;">New Chapter Released!</h1>
      <div style="text-align: center;">
        <img src="${coverImage}" alt="${mangaTitle}" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
      </div>
      <h2>${title}</h2>
      <h3>Chapter ${number} of ${mangaTitle}</h3>
      <div style="text-align: center;">
        <a href="https://tempestmanga.online" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Read Now</a>
      </div>
    </div>
    <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
      © 2024 Manga Hub. All rights reserved.
    </footer>
  </div>
`;


exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ mangaId: req.params.mangaId });
    console.log(chapters)
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.edit = async (req,res)=>{
  try{
    let user = req.user;
    console.log(user)
    if(user.role==="CEO"||user.role==="admin"){
      let id = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.json({msg:"Invalid Id"}).status(400)
      };
      let chapter = await Chapter.findByIdAndUpdate(id,{
        ...req.body
      });
      if(!chapter){
        return res.json({msg:"Not found Chapter"})
      }
      return res.json(chapter)
    }
      return res.json({msg:"You are not allowed to manage!"})
  }catch(err){
    return res.status(500).json({ message: err.message });
  }
}

exports.createChapter = async (req, res) => {
  const chapter = new Chapter({
    mangaId: req.body.mangaId,
    title: req.body.title,
    number: req.body.number,
    pages: req.body.pages
  });

  try {
    const newChapter = await chapter.save();
    await Manga.findByIdAndUpdate(
      req.body.mangaId,
      { $push: { chapters: newChapter._id } },
      { new: true, useFindAndModify: false }
    );

    const manga = await Manga.findById(req.body.mangaId); // Fetch the Manga document

    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }

    const users = await User.find({}, 'email');
    const emailAddresses = users.map(user => user.email);

    emailAddresses.forEach(email => {
      const html = generateChapterEmailTemplate(newChapter.title, manga.title, newChapter.number, manga.coverImage);

      const mailOptions = {
        from: 'Manga Hub <no-reply@yourdomain.com>',
        to: email,
        subject: 'New Chapter Released!',
        html: html
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${email}:`, error);
        } else {
          console.log(`Email sent to ${email}: ${info.response}`);
        }
      });
    });

    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

