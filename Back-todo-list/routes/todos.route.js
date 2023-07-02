const { Router } = require("express");
const { todoController } = require("../controllers/todo.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/", todoController.getTodo);
router.get("/todos/:id", todoController.getTodoById);
router.post("/todos", authMiddleware, todoController.addTodo);
router.patch("/todos/:id", authMiddleware, todoController.patchTodoById);
router.delete("/todos/:id", authMiddleware, todoController.deleteTodoById);

module.exports = router;
