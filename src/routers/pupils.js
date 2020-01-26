const express = require('express');
//const auth = require('../middleware/auth')
const Pupil = require('../models/pupils');

const router = new express.Router();

router.post('/pupils', async (req, res) => {
    const pupil = new Pupil(req.body);

    try {
        await pupil.save();
        const token = await pupil.generateAuthToken();
        res.status(201).send({pupil, token});
    } catch (error) {
        res.status(400).send(error)
    }
});

router.patch('/pupils/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => req.pupil[update] = req.body[update]);
        await req.pupil.save();
        res.send(req.pupil);
        
        if (!pupil) {
            res.status(404).send()
        }

        res.send(pupil);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/pupils/me', async (req, res) => {
    res.send(req.pupil);
});

router.get('/pupils/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const pupil = await Pupil.findById(_id);
        if (!pupil) {
            return res.status(404).send();
        }

        res.status(200).send(pupil);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
});

router.delete('/pupils/me', async (req, res) => {
    try {
        await req.pupil.remove();
        res.send(req.pupil);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router