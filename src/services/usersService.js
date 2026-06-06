const ApiError = require("../errors/apiError");
const User = require("../models/User");

async function getUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function createUser(userData) {
  if (!userData || !userData.name || !userData.email || !userData.password || !userData.role) {
    throw ApiError.BadRequest("All user fields are required.");
  }

  const normalizedEmail = userData.email.toString().trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw ApiError.Conflict("A user with this email already exists.");
  }

  const user = await User.create({
    name: userData.name.toString().trim(),
    email: normalizedEmail,
    password: userData.password,
    role: userData.role,
  });

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
}

async function updateUser(id, changes) {
  if (changes.email !== undefined) {
    changes.email = changes.email.toString().trim().toLowerCase();
    const duplicate = await User.findOne({ email: changes.email, _id: { $ne: id } });

    if (duplicate) {
      throw ApiError.Conflict("A user with this email already exists.");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(id, changes, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedUser) {
    throw ApiError.NotFound("User not found.");
  }

  return updatedUser;
}

async function deleteUser(id) {
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw ApiError.NotFound("User not found.");
  }

  return deletedUser;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
