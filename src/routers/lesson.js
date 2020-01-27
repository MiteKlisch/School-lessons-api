const express = require('express');
const auth = require('../middleware/auth')
//const Lesson = require('../models/lesson');
const lessonController = require('../controllers/lessonController');

const router = new express.Router();

router.post('/lesson', auth, lessonController.lesson_post);

router.patch('/lesson/:id', auth, lessonController.lesson_patch);

router.get('/lesson', auth, lessonController.lessons_get);

router.get('/lesson/:id', auth, lessonController.lesson_getID);

router.delete('/lesson/:id', auth, lessonController.lesson_delete);

module.exports = router