const User = require("./../models/user");

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: err });
    }
    res.json({
      id: user._id,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Email or password doesn't match" });
    }

    const token = jwt.sign({ _id: user._id }, "iamcoder");

    res.cookie("token", token, { expire: new Date() + 9999 });
    res.json({
      token,
      user: {
        email: user.email,
      },
    });
  });
};
