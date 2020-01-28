const express = require('express');
const groupController = require('../controllers/groupController');

const router = new express.Router();

router.post('/group', groupController.group_post);

router.patch('/group/:id', groupController.group_patch);

router.get('/group', groupController.groups_get);

router.get('/group/:id', groupController.group_getID);

router.delete('/group/:id', groupController.group_delete);

module.exports = router;
