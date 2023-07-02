const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("нет админа");
  }
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    return res.status(401).json("неверный тип токена");
  }
  try {
    const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json("Токен неверный");
  }
};
