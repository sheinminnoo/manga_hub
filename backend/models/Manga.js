const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genres: [{ type: String }],
  description: { type: String },
  coverImage: { type: String },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  ongoing: { type: Boolean, default: true },
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Manga', MangaSchema);
