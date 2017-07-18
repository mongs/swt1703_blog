const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Types = require('../models/Types');
/**
 * 管理首页
 */
router.get('/', function(req, res) {
    if(!req.session.username){
        res.redirect('/admin/login')
    }
    res.render('back/index')
});
/**
 * 用户 列表页
 */
router.get('/users', function(req, res) {
    if(!req.session.username){
        res.redirect('/admin/login')
    }
    res.render('back/users')
});
/**
 * 分类 列表页
 */
router.get('/types', function(req, res) {
    Types.find().then(result => {
        if(result){
            res.render('back/types',{
                types: result
            })
        }
    })
});
/**
 * 分类 添加页
 */
router.get('/types_add', function(req, res) {
    res.render('back/types_add')
});
/**
 * 文章 列表页
 */
router.get('/articles', function(req, res) {
    res.render('back/articles')
});
/**
 * 文章 添加页
 */
router.get('/articles_add', function(req, res) {
    res.render('back/articles_add')
});
/**
 * 渲染登录界面
 * 路由: /admin/login
 */
router.get('/login', function(req, res) {
  res.render('back/login')
});

/**
 * 处理登录逻辑
 * 路由: /admin/login
 */
router.post('/login', (req, res) => {
  let userInfo = req.body;
  let username = userInfo.username;
  let password = userInfo.password;
  Admin.findOne({
      username: username,
      password: password
  }).then(result => {
    if(result){
        req.session.cookie.maxAge = 3000000;
        req.session.username = username;
        //登录成功
        res.json({
            status: 0,
            msg: "登录成功"
        })
    }else{
        //登录失败
        res.json({
            status: 1,
            msg: "登录失败"
        })
    }
  })
});

/**
 * 分类 添加功能
 */
router.post('/types_add', function(req, res) {
    let type = req.body.type;
    Types
        .findOne({type: type})
        .then(result => {
            if(result){
                res.json({
                    status: 1,
                    msg: "分类已存在"
                })
            }else{
                Types.create({
                    type: type
                }).then(result => {
                    if(result){
                        res.json({
                            status: 0,
                            msg: "创建成功"
                        })
                    }else{
                        res.json({
                            status: 1,
                            msg: "创建失败,稍后重试"
                        })
                    }
                })
            }
        })
});

module.exports = router;
