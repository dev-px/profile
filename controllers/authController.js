require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = process.env.ALGORITHM;
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
const IV_LENGTH = parseInt(process.env.IV_LENGTH);


//signup or register route
exports.userSignup = (req, res) => {
  console.log(req.body);
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );
  let encrypted = cipher.update(req.body.password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encrypt = iv.toString("hex") + ":" + encrypted.toString("hex");
  console.log(encrypt);

  const data = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: encrypt,
  });

  data.save()
    .then((result) => {
      jwt.sign({ result }, process.env.JWTKEY,{ expiresIn: "500s" }, (err, token) => {
          res.status(201).json(token);
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// login route
exports.userLogin = (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    let textParts = data.password.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY, "hex"),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const decrypt = decrypted.toString();
    console.log(decrypt);

    if (decrypt == req.body.password) {
      jwt.sign({ data }, process.env.JWTKEY, { expiresIn: "500s" }, (err, token) => {
          res.status(200).json(token);
        });
    }
  });
};
