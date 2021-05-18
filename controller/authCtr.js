const User = require("../model/auth"); // User 스키마를 불러오는 거

const bcrypt = require("bcrypt"); // 패스워드 암호화 하는 것
const secretKey = require("../config/secretKey.json"); //
const jwt = require("jsonwebtoken");


const authCtr = {
  register: async (req, res) => {
    // 회원가입
    // req.body안에 있는 데이터를 받아오자
    const { username, password } = req.body;
    // 회원가입을 한 사람인지 아닌지 확인하는 거
    const exist = await User.findOne({ username: username });
    if (exist) {
      res.status(504).send("user exist!!");
      return;
    }
    // 새 가입자라면 스키마에 새로운 것을 넣어주는데 username만 넣고
    const user = new User({
      username: username,
    });
    // 비번은 비크립트로 암호화 처리하도록 하자
    const hashedPassword = await bcrypt.hash(password, 10); // hash알고리즘을 10번 할거라고 하는 거야
    user.password = hashedPassword;
    await user.save(); // 저장을 해주고
    res.redirect("/");
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(500).send("user not found!!");
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(500).send("password invalid");
    }
    const data = user.toJSON();
    delete data.password;
    const token = jwt.sign(
      {
        _id: data._id,
        username: data.username,
      },
      secretKey.key,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.redirect("/");
  },
};

module.exports = authCtr;
