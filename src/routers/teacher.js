const express = require('express');
const auth = require('../middleware/auth');
const Teacher = require('../models/teacher');
const router = new express.Router();

router.post('/teacher', async (req, res) => {
    const teacher = new Teacher(req.body);

    try {
        await teacher.save();
        const token = await teacher.generateAuthToken();
        res.status(201).send({teacher, token});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/teacher/login', async (req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password);
        const token = await teacher.generateAuthToken();
        res.send({teacher, token});
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/teacher/logout', auth, async (req, res) => {
    try {
        req.teacher.tokens =  req.teacher.tokens.filter((token) => {
            return token.token != req.token;
        });

        await req.teacher.save();
        res.status(200).send('You logged out!');
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/teacher/logoutAll', auth, async (req, res) => {
    try {
        req.teacher.tokens = [];
        await req.teacher.save();
        res.send('Logged out All!');
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/teacher/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => req.teacher[update] = req.body[update]);
        await req.teacher.save();
        res.send(req.teacher);
        
        if (!teacher) {
            res.status(404).send()
        }

        res.send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/teacher/me', auth, async (req, res) => {
    res.send(req.teacher);
});

router.get('/teacher/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const teacher = await Teacher.findById(_id);
        if (!teacher) {
            return res.status(404).send();
        }

        res.status(200).send(teacher);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
});

router.delete('/teacher/me', auth, async (req, res) => {
    try {
        await req.teacher.remove();
        res.send(req.teacher);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;