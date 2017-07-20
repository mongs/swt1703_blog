const express = require('express');
const router = express.Router();
router.post('/reg', (req, res) => {
  // 设置CORS为请求的Origin值
  res.header("Access-Control-Allow-Origin", 'http://localhost:9527/');
  console.log(req.body)
})

module.exports = router;