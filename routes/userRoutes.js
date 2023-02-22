const express = require('express');
const {getUsers, createUser, getOneUser, updateUser, deleteUser} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
