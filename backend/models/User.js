const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'CEO'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  profilePhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPhoto' }
});

UserSchema.statics.login = async function(email, password) {
  let user = await this.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }
  let isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) {
    return user;
  } else {
    throw new Error('Password incorrect');
  }
};

module.exports = mongoose.model('User', UserSchema);
