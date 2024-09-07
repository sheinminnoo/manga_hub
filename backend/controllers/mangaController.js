const { default: mongoose } = require("mongoose");
const Manga = require("../models/Manga");
const User = require("../models/User");
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

exports.getAllManga = async (req, res) => {
  try {
    const manga = await Manga.find().populate('chapters');
    res.json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createManga = async (req, res) => {
  const manga = new Manga({
    title: req.body.title,
    author: req.body.author,
    genres: req.body.genres,
    description: req.body.description,
    coverImage: req.body.coverImage,
    ongoing: req.body.ongoing,
    popularity: req.body.popularity,
  });

  try {
    const newManga = await manga.save();

    const users = await User.find({}, 'email');
    const emailAddresses = users.map(user => user.email);

    emailAddresses.forEach(email => {
      const html = generateEmailTemplate(newManga.title, newManga.author, newManga.description, newManga.coverImage);

      const mailOptions = {
        from: 'Manga Hub <no-reply@yourdomain.com>',
        to: email,
        subject: 'New Manga Released!',
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

    return res.status(201).json(newManga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.editManga = async(req,res)=>{
  try{
    let user = req.user;
    console.log(user)
    if(req.user.role==="CEO" || req.user.role==="admin"){
      let id = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({Msg:"not a valid id"}).status(400);
      };
      let manga = await Manga.findByIdAndUpdate(id ,{
        ...req.body
      });
      if(!manga){
        return res.json({msg : "Not found Manga"})
      };
      return res.json(manga)
    }
    return res.json({msg : "You are not accessed to edit manga"}).status(400);
  }catch(err){
    return res.status(400).json({ message: err.message });
  }
},

exports.destroy = async (req,res) =>{
  try {
    let user = req.user;
    if(user.role==="CEO" || user.role==="admin"){
      let id = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ msg : 'not a valid id'});
      }
      let manga = await Manga.findByIdAndDelete(id);
      if(!manga) {
          return res.status(404).json({ msg : 'recipe not found'});
      }
      return res.json(manga);
    }
    return res.json({msg:"Not allowed to delete!"}).status(400)
}catch(e) {
    return res.status(500).json({ msg : 'internet server error'});
}
}

exports.getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id).populate('chapters');
    if (!manga) return res.status(404).json({ message: 'Manga not found' });
    res.json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRelatedManga = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) return res.status(404).json({ message: 'Manga not found' });

    const relatedManga = await Manga.find({
      $or: [{ author: manga.author }, { genres: { $in: manga.genres } }],
      _id: { $ne: manga._id }
    });

    res.json(relatedManga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOngoingManga = async (req, res) => {
  try {
    const ongoingManga = await Manga.find({ ongoing: true });
    res.json(ongoingManga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompletedManga = async (req, res) => {
  try {
    const completedManga = await Manga.find({ ongoing: false });
    res.json(completedManga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPopularManga = async (req, res) => {
  try {
    const popularManga = await Manga.find({ popularity: { $gte: 90 } });
    res.json(popularManga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
