const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

// Function to decode and verify JWT token from request headers
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      // Verify the token using the TOKEN_SECRET_KEY
      const tokenDecoded = jsonwebtoken.verify(
        bearer,
        process.env.TOKEN_SECRET_KEY
      );
      return tokenDecoded;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// Middleware to verify user authentication using JWT token
exports.verifyToken = async (req, res, next) => {
  // Find the user associated with the decoded token's ID
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) return res.status(401).json("Unathorized");
    // Attach the user data to the request for further use
    req.user = user;
    // Continue to the next middleware or route
    next();
  } else {
    // If token is not valid or missing, return Unauthorized
    res.status(401).json("Unathorized");
  }
};
