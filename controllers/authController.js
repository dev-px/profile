require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = process.env.ALGORITHM;
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
const IV_LENGTH = parseInt(process.env.IV_LENGTH);


//signup or register route
exports.userSignup = async (req, res) => {
  try {
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

    const result = await data.save();

    const token = jwt.sign({ result }, process.env.JWTKEY, {
      expiresIn: "600s",
    });

    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login route
exports.userLogin = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

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

    if (decrypt === req.body.password) {
      const token = jwt.sign({ data }, process.env.JWTKEY, {
        expiresIn: "600s",
      });
      res.status(200).json(token);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
