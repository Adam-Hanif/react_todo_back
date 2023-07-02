const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.userController = {
  getUser: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.json({ err: "Ошибка при  показе всех users" });
    }
  },
  addUser: async (req, res) => {
    try {
      const { login, password } = req.body;
      const hashPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRUPT_ROUNDS)
      );
      const user = await User.create({
        login,
        password: hashPassword,
      });
      res.json(user);
    } catch (err) {
      res.json({ err: "Ошибка при добавлении users" });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("Удалено");
    } catch (err) {
      res.json({ err: "Ошибка при удалении user" });
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;
    const condidate = await User.findOne({ login });
    if (!condidate) {
      return res.status(401).json({ err: "Неверный логин" });
    }
    const valid = await bcrypt.compare(password, condidate.password);
    if (!valid) {
      return res.status(401).json({ err: "Неверный пароль" });
    }
    const payload = {
      id: condidate._id,
      login: condidate.login,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    res.json({ token });
  },
};
