const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionSet');

router.get('/', questionController.getAllQuestions);
router.post('/', questionController.createQuestion);
router.get('/:id', questionController.getQuestionsById);
router.delete('/:id', questionController.deleteQuestion);
router.put('/:id', questionController.updateQuestion);

module.exports = router;