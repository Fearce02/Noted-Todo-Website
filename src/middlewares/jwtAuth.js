import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = AuthHeader.split(" ")[1];

  try {
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedtoken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid JSON WEB TOKEN",
    });
  }
};

export default authenticate;
