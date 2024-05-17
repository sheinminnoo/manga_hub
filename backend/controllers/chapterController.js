const Chapter = require('../models/Chapter');
const Manga = require('../models/Manga');

exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ mangaId: req.params.mangaId });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChapter = async (req, res) => {
  const chapter = new Chapter({
    mangaId: req.body.mangaId,
    title: req.body.title,
    number: req.body.number,
    pages: req.body.pages
  });

  try {
    const newChapter = await chapter.save();
    
    // Find the corresponding Manga document and update its chapters array
    await Manga.findByIdAndUpdate(
      req.body.mangaId,
      { $push: { chapters: newChapter._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
