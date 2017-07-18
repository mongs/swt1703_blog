const mongoose = require('mongoose');
const db = require('./db');

//定义结构
let AdminSchema = mongoose.Schema({
    username: String,
    password: String
});

// 模型
let AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
