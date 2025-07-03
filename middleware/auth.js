const jwt = require('jsonwebtoken');
const SECRET = "your_jwt_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
