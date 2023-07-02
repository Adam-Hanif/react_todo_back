const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");
module.exports.todoController = {
  getTodo: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.json({ err: "Ошибка при  показе всех todo" });
    }
  },

  addTodo: async (req, res) => {
    const { text, favorite } = req.body;
    try {
      const todo = await Todo.create({ userId: req.user.id, text, favorite });
      return res.json(todo);
    } catch (err) {
      return res.status(401).json("Токен неверный");
    }
  },
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.json(todo);
    } catch (err) {
      res.json({ err: "Ошибка при показа todo" });
    }
  },
  deleteTodoById: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);
      if (todo.userId.toString() === req.user.id) {
        await Todo.findByIdAndRemove(id);
        return res.json("Удалено");
      }
      return res.status(401).json("ошибка. Нет доступа");
    } catch (err) {
      return res.status(401).json("Ошибка" + err.toString());
      // res.json({ err: "Ошибка при добавлении todo" });
    }
  },
  patchTodoById: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          favorite: !req.body.favorite,
        },
        { new: true }
      );
      res.json(todo);
    } catch (err) {
      res.json({ err: "Ошибка при изменение todo" });
    }
  },
};
