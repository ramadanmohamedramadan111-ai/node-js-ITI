const ApiError = require("../errors/apiError");
const postsService = require("../services/postsService");

async function getPosts(req, res, next) {
  try {
    const posts = await postsService.getPosts();
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      throw ApiError.NotFound("Post not found.");
    }

    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const newPost = await postsService.createPost(req.body);
    res.status(201).json({ status: "success", data: newPost });
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const updatedPost = await postsService.updatePost(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedPost });
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await postsService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
