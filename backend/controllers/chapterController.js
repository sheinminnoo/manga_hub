const { default: mongoose } = require('mongoose');
const Chapter = require('../models/Chapter');
const Manga = require('../models/Manga');
const User = require('../models/User');
const chapterEmailQueue = require('../Queues/chapterEmailQueue')
exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ mangaId: req.params.mangaId });
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
    let users = await User.find(null,['email']);
    let emails = users.map(user=>user.email);
    console.log(emails)
    emails = emails.filter(email=>email !== req.user.email)
    chapterEmailQueue.add({
      view : 'chapterEmail',
      data : {
          name : req.user.username,
          chapter
      },
      from : req.user.email,
      to : emails,
      subject : "New Chapter is created recendly."
  })
    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
