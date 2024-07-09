const Favorite = require('../models/Favorite');
const Manga = require('../models/Manga');

exports.addFavorite = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const userId = req.user._id;

    const favorite = new Favorite({ user: userId, manga: mangaId });
    await favorite.save();

    res.status(201).json({ message: 'Manga added to favorites', favorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const { userId, mangaId } = req.params;
    const favorite = await Favorite.findOne({ user: userId, manga: mangaId });

    if (favorite) {
      return res.status(200).json({ isFavorite: true });
    } else {
      return res.status(200).json({ isFavorite: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check favorite status' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const userId = req.user._id;

    await Favorite.findOneAndDelete({ user: userId, manga: mangaId });

    res.status(200).json({ message: 'Manga removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user: userId }).populate('manga');
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

