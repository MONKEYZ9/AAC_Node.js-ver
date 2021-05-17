const express = require("express");
const router = express.Router();
const authCtr = require("../../controller/authCtr");

router.get("/login", (req, res) => {
    res.render("login");
});

// 회원가입으로 가자
router.get("/register", (req, res) => {
    res.render("register");
});
// 회원가입 진행
router.post("/register", authCtr.register);

module.exports = router