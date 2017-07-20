const mongoose = require('mongoose');
const db = require('./db');

//定义结构
let UserSchema = mongoose.Schema({
  email: String,
  password: String
});

// 模型
let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
