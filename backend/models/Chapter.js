const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  title: { type: String, required: true },
  number: { type: Number, required: true },
  pages: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chapter', ChapterSchema);
