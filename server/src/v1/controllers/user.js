const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { password } = req.body;
  try {
    // Encrypt the password using AES encryption
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    );

    // Create a new user with encrypted password
    const user = await User.create(req.body);

    // Generate a JWT token for authentication
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );
    // Return the user and token as a response
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find a user by username and select the password and username fields
    const user = await User.findOne({ username }).select("password username");
    // If no user found, return an error
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password",
          },
        ],
      });
    }

    // Decrypt the stored password and compare it with the provided password
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    // If passwords don't match, return an error
    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password",
          },
        ],
      });
    }

    // Remove the password from the user object
    user.password = undefined;

    // Generate a JWT token for authentication
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Return the user and token as a response
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
