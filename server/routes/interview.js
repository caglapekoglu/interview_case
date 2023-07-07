const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview');

router.get('/', interviewController.getAllInterview);
router.post('/', interviewController.createInterview);
router.get('/:id', interviewController.getInterviewById);


module.exports = router;