const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

router.post('/reg', (req, res) => {
  res.header("Access-Control-Allow-Origin", '*');
  let email = req.body.email;
  let password = req.body.password;
  const secret = 'wally';
  // 加密
  password = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
  User.findOne({email: email}).then(result => {
    if(result){
      res.json({
        status: 1,
        msg: "该邮箱已被注册"
      })
    }else{
      User.create({
        email: email,
        password: password
      }).then(result => {
        req.session.email = email;
        res.json({
          status: 0,
          msg: "注册成功"
        })
      })
    }
  })
});
router.post('/login', (req, res) => {
  res.header("Access-Control-Allow-Origin", '*');
  let email = req.body.email;
  let password = req.body.password;
  const secret = 'wally';
  // 加密
  password = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
  User.findOne({email: email, password: password}).then(result => {
    if(result){
      res.json({
        status: 0,
        msg: "登录成功"
      })
    }else{
      res.json({
        status: 1,
        msg: "登录失败"
      })
    }
  })
})

module.exports = router;