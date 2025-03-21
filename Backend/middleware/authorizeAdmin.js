// middleware/authorizeAdmin.js
const jwt = require("jsonwebtoken");

const authorizeAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, "jwt_secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = decoded;  // Attach decoded info to request
    next();
  });
};

module.exports = authorizeAdmin;
