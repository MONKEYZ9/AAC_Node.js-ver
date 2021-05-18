var express = require('express');
var router = express.Router();

const authRouter = require("./auth");
const postRouter = require("./posts");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.use("/auth", authRouter);
router.use("/posts", postRouter);


module.exports = router;
