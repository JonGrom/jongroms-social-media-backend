const router = require('express').Router();

//import thought controller functions

// /api/thoughts
router.route('/').get().post();

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get().delete().put()

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post();

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete();
