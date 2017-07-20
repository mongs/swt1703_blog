const mongoose = require('mongoose');
const db = require('./db');

//定义结构
let ArticleSchema = mongoose.Schema({
  title: String,
  time: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,    //ObjectId
    ref: 'Types'                    //引用那个表
  },
  show: Boolean,
  content: String,
  author: String
});

// 模型
let ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
