const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer');

router.get('/', answerController.getAllAnswer);
router.post('/', answerController.createAnswer);
router.get('/:id', answerController.getAnswerById);


module.exports = router;