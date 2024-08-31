const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } =require('../../controllers/userController')

//import User controller functions

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/users/:userId/friends
// router.route('/:userId/friends').post();

// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').delete();

