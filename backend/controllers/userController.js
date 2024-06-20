const createToken = require('../helpers/createToken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Token = require('../models/Token');
const { default: mongoose } = require('mongoose');
const fs = require('fs').promises;
const UserController = {

  me : async (req,res) => {
    return res.json(req.user);
  },

  uploadProfile: async (req, res) => {
    try {
      let id = req.user._id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not a valid id" });
      }
      let user = await User.findByIdAndUpdate(id, {
        profile: '/' + req.file.filename
      });
      let fileExists;
      let path = __dirname+"/../public"+user.profile;
      try{
        await fs.access(path);
        fileExists = true;
      }catch {
        fileExists = false;
      }
      if(fileExists){
        fs.unlink(path);
      }
      if (!user) {
        return res.status(404).json({ msg: "Not found user" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password, cpassword, role } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: 'User already registered' });
      }
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@])[A-Za-z\d@]{8,}$/;
      if (password !== cpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@)' });
      }
      const hashValue = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashValue, role });
      const token = createToken(newUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
      return res.status(200).json({ user: newUser, token });
    } catch (err) {
      console.error("Error in registration:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login : async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.login(email, password);
      let token = createToken(user._id);
  
      // Save the token
      await Token.create({ token, userId: user._id });
  
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  logout: async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.json({ msg: "User logged out" });
  },



  getAllUsers: async (req, res) => {
    try {
      let users;
      if (req.user.role === 'CEO') {
        users = await User.find({});
      } else if (req.user.role === 'admin') {
        users = await User.find({ role: { $ne: 'CEO' } });
      } else {
        return res.status(403).json({ error: 'Forbidden' });
      }
      return res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, password, role } = req.body;
  
    if (req.user.role !== 'CEO' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    if (req.user.role === 'admin' && role === 'CEO') {
      return res.status(403).json({ error: 'Admins cannot assign CEO role' });
    }
  
    try {
      const updates = { username };
      if (password) {
        const hashValue = await bcrypt.hash(password, 10);
        updates.password = hashValue;
      }
      if (role && req.user.role === 'CEO') {
        updates.role = role;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
      return res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  deleteUser: async (req, res) => {
    const { userId } = req.params;
  
    if (req.user.role !== 'CEO' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    if (req.user.role === 'admin') {
      const userToDelete = await User.findById(userId);
      if (userToDelete.role === 'admin' || userToDelete.role === 'CEO') {
        return res.status(403).json({ error: 'Admins cannot delete other admins or CEOs' });
      }
    }
  
    try {
      await User.findByIdAndDelete(userId);
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};

module.exports = UserController;
