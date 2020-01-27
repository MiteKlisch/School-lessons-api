const express = require('express');
const auth = require('../middleware/auth');
//const Teacher = require('../models/teacher');
const teacherController = require('../controllers/teacherController');

const router = new express.Router();


router.post('/teacher', teacherController.teacher_post);

router.post('/teacher/login', teacherController.teacher_login);

router.post('/teacher/logout', auth, teacherController.teacher_logout);

router.post('/teacher/logoutAll', auth, teacherController.teacher_logoutAll);

router.patch('/teacher/me', auth, teacherController.teacher_patch);

router.get('/teacher/me', auth, teacherController.teacher_getMe);

router.get('/teacher/:id', auth, teacherController.teacher_getID);

router.delete('/teacher/me', auth, teacherController.teacher_delete);

module.exports = router;