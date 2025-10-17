const User = require('../models/userModel');

exports.getAllUsers = async () => User.find();
exports.getUserById = async (id) => User.findById(id);

exports.createUser = async (data) => {
  const user = new User(data);
  return user.save();
};

exports.deleteUser = async (id) => User.findByIdAndDelete(id);

exports.updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

// 👇 Authentification
exports.getUserByEmail = async (email) => User.findOne({ email });