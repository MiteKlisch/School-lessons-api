const express = require('express');
const auth = require('../middleware/auth')
const Group = require('../models/group');

const router = new express.Router();

router.post('/group', auth, async (req, res) => {
    const group = new Group({
        ...req.body,
        teacher: req.teacher._id
        });

    try {
        await group.save();
        res.status(201).send(group)
    } catch (e) {
        res.status(401).send(e)
    }
});

router.patch('/group/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['theme', 'teacher', 'groupOfPupils', 'statDate', 'endDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
       const group = await Group.findOne({ _id: req.params.id, pupil: req.pupil._id });

        if (!group) {
            return res.status(404).send()
        }

        updates.forEach( (update) => group[update] = req.body[update]);
        await group.save();

        res.send(group);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/group', auth, async (req, res) => {
    try {
        const group = await Group.find({ pupil: req.pupil._id })
        //await req.teacher.populate('lesson').execPopulate();
        res.send(group);
    } catch (error) {
        res.send(error)
    }
});

router.get('/group/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        //const lesson = await Lesson.findById(_id);
        const group = await Group.findOne({ _id, pupil: req.pupil._id });
        if (!group) {
            return res.status(404).send();
        }

        res.status(200).send(group);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
});

router.delete('/group/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const group = await Pupil.findOneAndDelete({_id: _id, pupil: req.pupil._id});

        if (!group) {
            return res.status(400).send();
        }

        res.send(group)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router