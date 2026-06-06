const ApiError = require("../errors/apiError");
const usersService = require("../services/usersService");

async function getUsers(req, res, next) {
  try {
    const users = await usersService.getUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) {
      throw ApiError.NotFound("User not found.");
    }

    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
