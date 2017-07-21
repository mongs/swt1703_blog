const express = require('express');
const Types = require('../../models/Types');
const Article = require('../../models/Article');
const router = express.Router();

let resData = {};

router.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:9527');
  res.header("Access-Control-Allow-Credentials", "true");
  console.log(req.session,'index')

  if(req.session.email){
    resData.email = req.session.email
  }else{
    resData.email = ''  // 未登录
  }
  next()
})

router.get('/', (req,res) => {
  Types.find().then(result => {
    let typeArr = []
    result.forEach(function (item,index) {
      typeArr.push(item.type)
    })
    resData.types = typeArr;
    return new Promise(function (resolve,reject) {
      Article.find({show: false}).populate('type').then(result => {
        if(result){
          resolve(result)
        }else{
          reject("查询文章失败")
        }
      })
    }).then(result => {
      console.log(result)
      resData.articles = result;
      res.json(resData)
    })

  })
});




module.exports = router;