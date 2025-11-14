const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Protect middleware: verifies JWT and attaches user to req
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Decoded token:", decoded);
    
    const user = await User.findById(decoded.id).select("-password");
    console.log("👤 User from DB:", { id: user?._id, role: user?.role, email: user?.email });
    
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Role-based authorization
const authorizeRoles = (...roles) => (req, res, next) => {
  console.log("🔐 Role check - Required:", roles, "User role:", req.user?.role);
  
  if (!req.user || !roles.includes(req.user.role)) {
    console.log("❌ Authorization failed!");
    return res
      .status(403)
      .json({ message: "Forbidden: insufficient permissions" });
  }
  
  console.log("✅ Authorization success!");
  next();
};

module.exports = { protect, authorizeRoles };
