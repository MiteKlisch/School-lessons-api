const express = require('express');
//const auth = require('../middleware/auth')
const pupilController = require('../controllers/pupilContoller');

const router = new express.Router();

router.post('/pupils', pupilController.pupil_post);

router.patch('/pupils/:id', pupilController.pupil_patch);

router.get('/pupils', pupilController.pupils_get);

router.get('/pupils/:id', pupilController.pupil_get);

router.delete('/pupils/:id', pupilController.pupil_delete);

module.exports = router