const ApiError = require("../errors/apiError");
const Post = require("../models/Post");

async function getPosts() {
  return await Post.find().populate("userId", "name email");
}

async function getPostById(id) {
  return await Post.findById(id).populate("userId", "name email");
}

async function createPost(postData) {
  if (!postData || !postData.title || !postData.content || !postData.userId) {
    throw ApiError.BadRequest("Post title, content, and userId are required.");
  }

  const post = await Post.create({
    title: postData.title.toString().trim(),
    content: postData.content.toString().trim(),
    userId: postData.userId,
  });

  return post.toObject();
}

async function updatePost(id, changes) {
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      ...(changes.title !== undefined && { title: changes.title.toString().trim() }),
      ...(changes.content !== undefined && { content: changes.content.toString().trim() }),
      ...(changes.userId !== undefined && { userId: changes.userId }),
    },
    { new: true, runValidators: true, context: "query" }
  )
    .populate("userId", "name email");

  if (!updatedPost) {
    throw ApiError.NotFound("Post not found.");
  }

  return updatedPost;
}

async function deletePost(id) {
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    throw ApiError.NotFound("Post not found.");
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
