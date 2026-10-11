
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check whether the Authorization header exists.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Please login.",
      });
    }

    // Extract the token.
    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Token is missing.",
      });
    }

    // Ensure the JWT secret is configured.
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables.");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    // Verify the token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded payload is an object.
    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({
        message: "Invalid token payload. Please login again.",
      });
    }

    // Attach the authenticated user's information.
    req.user = decoded;

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Your session has expired. Please login again.",
      });
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }

    console.error("Authentication middleware error:", error.message);

    return res.status(500).json({
      message: "Authentication failed due to a server error.",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Please login first.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }

    return next();
  };
};

module.exports = {
  protect,
  authorize,
};
