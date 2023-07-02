const { Router } = require("express");
const { userController } = require("../controllers/user.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/users", authMiddleware, userController.getUser);
router.post("/auth", userController.addUser);
router.delete("/user/:id", authMiddleware, userController.deleteUserById);
router.post("/login", userController.login);

module.exports = router;
