const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const auth = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        const { userID } = decoded;
        const user = new UserModel.findOne({ _id: userID });
        const requiredRole = user.role
        req.role = requiredRole
        next();
      } else {
        res.json({ err });
      }
    });
  } else {
    res.json({ msg: "please login" });
  }
};

module.exports = {
  auth,
};
