const Group = require('../models/group');
const Pupil = require('../models/pupil');


exports.group_post = async (req, res) => {
    const pupil = await Pupil.find({});
    const group = new Group({ 
        ...req.body,
        students: pupil
    });

    try {
        await group.save();
        res.status(201).send(group)
    } catch (e) {
        res.status(401).send(e)
    }
};

exports.group_patch = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nameGroup', 'students'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
       const group = await Group.findOne({ _id: req.params.id });

        if (!group) {
            return res.status(404).send()
        }

        updates.forEach( (update) => group[update] = req.body[update]);
        await group.save();

        res.send(group);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.groups_get = async (req, res) => {
    try {
        const group = await Group.find({})
        //await req.teacher.populate('lesson').execPopulate();
        res.send(group);
    } catch (error) {
        res.send(error)
    }
};

exports.group_getID = async (req, res) => {
    try {
        //const lesson = await Lesson.findById(_id);
        const group = await Group.findOne({ _id: req.params.id });
        if (!group) {
            return res.status(404).send();
        }

        res.status(200).send(group);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
};

exports.group_delete = async (req, res) => {
    try {
        const group = await Group.findOneAndDelete({ _id: req.params.id });

        if (!group) {
            return res.status(400).send();
        }

        res.send(group)
    } catch (e) {
        res.status(500).send(e)
    }
};