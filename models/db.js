/**
 * 数据库连接
 * 数据名  myblog
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myblog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("数据库连接成功")
});

module.exports = db;


