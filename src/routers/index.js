const express = require('express');
const School = require('../models/school')
const router = new express.Router();

router.post('/lesson', async (req, res) => {
    const lesson = new School(req.body);

    try {
        await lesson.save();
        res.status(201).send(lesson)
    } catch (e) {
        res.status(401).send(e)
    }
});

router.patch('/lesson/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['theme', 'teacher', 'groupOfPupils', 'statDate', 'endDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }

    try {
       const lesson = await School.findById(req.params.id);

       updates.forEach( (update) => lesson[update] = req.body[update]);
       await lesson.save();

        if (!lesson) {
            return res.status(404).send()
        }

        res.send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/lesson', async (req, res) => {
    try {
        const lesson = await School.find({});
        res.send(lesson);
    } catch (error) {
        res.send(error)
    }
});

router.get('/lesson/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const lesson = await School.findById(_id);
        if (!lesson) {
            return res.status(404).send();
        }

        res.status(200).send(lesson);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
});

router.delete('/lesson/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const lesson = await School.findByIdAndDelete(_id);

        if (!lesson) {
            return res.status(400).send();
        }

        res.send(lesson)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router