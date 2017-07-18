const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
/**
 * admin 首页
 */
router.get('/', function(req, res) {
    res.render('back/index')
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

module.exports = router;
