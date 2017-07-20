const express = require('express');
const markdown = require('markdown').markdown;
const router = express.Router();
const Admin = require('../models/Admin');
const Types = require('../models/Types');
const Article = require('../models/Article');
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
    Article.find().populate({path:'type', select:'type'}).then(function (result) {
      res.render('back/articles', {
          articles: result
      })
  })

});
/**
 * 文章 添加页
 */
router.get('/articles_add', function(req, res) {
    Types.find().then(result => {
      res.render('back/articles_add',{
          types: result
      })
    })

});
/**
 * 文章添加功能
 */
router.post('/articles_add', function (req, res) {
    let info = req.body;

    let content = markdown.toHTML(info.content);
    let show = true;
    if(info.show){
      show = false
    }

    let obj = {
      title: info.title,
      time: info.time,
      type: info.type,
      author: info.author,
      show: show,
      content: content
    };
    Article.create(obj).then(result => {
        if(result){
            res.json({
              status: 0,
              msg: "文章添加成功"
            })
        }else{
            res.json({
                status: 1,
                msg:"文章添加失败"
            })
        }
    })
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
    Types.findOne({type: type}).then(result => {
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
/**
 * 分类 删除
 */
router.get('/delete', (req, res) => {
    let tid = req.query.tid;
    Types.remove({_id: tid}).then((result) => {
        if(result) {
            res.redirect('/admin/types')
        }
    })
})
/**
 * 分类  编辑页面
 */
router.get('/edit', (req, res) => {
    let type = req.query.type;
    let tid = req.query.tid;
    res.render('back/types_edit',{
        type: type,
        tid: tid
    })
})
/**
 * 分类  编辑功能
 */
router.post('/types_edit', (req, res) => {
    let type = req.body.type;
    let tid = req.body.tid;
    console.log(tid,type)
    Types.update({_id: tid}, {type: type,update_date:Date.now()}).then(result => {
        if(result){
            res.json({
                status: 0,
                msg: "修改分类成功"
            })
        }else{
            res.json({
                status: 1,
                msg: "修改分类失败"
            })
        }
    })
})

module.exports = router;
