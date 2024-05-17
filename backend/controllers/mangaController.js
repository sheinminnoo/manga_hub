const Manga = require("../models/Manga");

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
    popularity: req.body.popularity
  });

  try {
    const newManga = await manga.save();
    res.status(201).json(newManga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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

exports.getPopularManga = async (req, res) => {
    try {
      const popularManga = await Manga.find({ popularity: { $gte: 90 } });
      res.json(popularManga);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
