const router = require('express').Router();

//import user controller functions

// /api/users
router.route('/').get().post();

// /api/users/:userId
router.route('/:userId').get().delete().update()

// /api/users/:userId/friends
router.route('/:userId/friends').post();

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete();

