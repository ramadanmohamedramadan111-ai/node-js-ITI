const express = require("express");
const usersController = require("../controllers/usersController");
const { validate } = require("../middleware/validationMiddleware");
const { createUser, updateUser, objectIdParam } = require("../validation/userValidation");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:id", validate(objectIdParam), usersController.getUserById);
router.post("/", validate(createUser), usersController.createUser);
router.put("/:id", validate(objectIdParam), validate(updateUser), usersController.updateUser);
router.delete("/:id", validate(objectIdParam), usersController.deleteUser);

module.exports = router;
