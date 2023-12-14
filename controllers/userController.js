const User = require("../models/user");

exports.getAllUsers = (req, res) => {
  User.find().then((result) => {
    res.status(200).json(result);
  });
};
