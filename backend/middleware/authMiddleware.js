import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  console.log("i am a fat monkey",token);

  if (!token) return res.sendStatus(401);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("verified");
    next();
  } catch {
    console.log("verification failed")
    res.sendStatus(401);
  }
}
