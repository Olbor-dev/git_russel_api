const User = require('../models/userModel');

exports.getAllUsers = async () => User.find();

exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

exports.deleteUser = async (id) => User.findByIdAndDelete(id);

exports.getUserById = async (id) => User.findById(id);

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};