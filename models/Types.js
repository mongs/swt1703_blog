const mongoose = require('mongoose');
const db = require('./db');

//定义结构
let TypesSchema = mongoose.Schema({
    type: String,
    create_date: {
        type: Date,
        default: Date.now()
    },
    update_date: {
        type: Date,
        default: Date.now()
    }
});

// 模型
let TypesModel = mongoose.model('Types', TypesSchema);

module.exports = TypesModel;
