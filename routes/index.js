var express = require('express');
var router = express.Router();

const authRouter = require("./auth");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.use("/auth", authRouter);


module.exports = router;
