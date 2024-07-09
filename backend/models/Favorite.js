const { default: mongoose } = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
    manga : { type : mongoose.Schema.Types.ObjectId , ref : "Manga" , required : true },
    user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    addedAt : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Favorite', FavoriteSchema);