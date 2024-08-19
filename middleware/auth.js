import jwt from "jsonwebtoken";

export const authMiddleware = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token) {
    return response.status(401).send("Access denied");
  }
  try {
    const userDetail = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    request.user = userDetail;
    next();
  } catch (error) {
    response.status(400).send("Invalid Token");
  }
};
