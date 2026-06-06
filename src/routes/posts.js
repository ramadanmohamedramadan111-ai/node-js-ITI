const express = require("express");
const postsController = require("../controllers/postsController");
const { validate } = require("../middleware/validationMiddleware");
const { createPost, updatePost, objectIdParam } = require("../validation/postValidation");

const router = express.Router();

router.get("/", postsController.getPosts);
router.get("/:id", validate(objectIdParam), postsController.getPostById);
router.post("/", validate(createPost), postsController.createPost);
router.put("/:id", validate(objectIdParam), validate(updatePost), postsController.updatePost);
router.delete("/:id", validate(objectIdParam), postsController.deletePost);

module.exports = router;
