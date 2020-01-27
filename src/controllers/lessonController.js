const Lesson = require('../models/lesson');

exports.lesson_post = async (req, res) => {
    const lesson = new Lesson({
        ...req.body,
        teacher: req.teacher._id
        });

    try {
        await lesson.save();
        res.status(201).send(lesson)
    } catch (e) {
        res.status(401).send(e)
    }
};

exports.lesson_patch = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['theme', 'teacher', 'groupOfPupils', 'statDate', 'endDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
       const lesson = await Lesson.findOne({ _id: req.params.id, teacher: req.teacher._id });

        if (!lesson) {
            return res.status(404).send()
        }

        updates.forEach( (update) => lesson[update] = req.body[update]);
        await lesson.save();

        res.send(lesson);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.lessons_get = async (req, res) => {
    try {
        const lesson = await Lesson.find({ teacher: req.teacher._id })
        //await req.teacher.populate('lesson').execPopulate();
        res.send(lesson);
    } catch (error) {
        res.send(error)
    }
};

exports.lesson_getID = async (req, res) => {
    const _id = req.params.id;
    try {
        //const lesson = await Lesson.findById(_id);
        const lesson = await Lesson.findOne({ _id, teacher: req.teacher._id });
        if (!lesson) {
            return res.status(404).send();
        }

        res.status(200).send(lesson);
    } catch (e) {
        res.status(500).send({e: 'Not found'});
    }
};

exports.lesson_delete = async (req, res) => {
    const _id = req.params.id;
    try {
        const lesson = await Lesson.findOneAndDelete({_id: _id, teacher: req.teacher._id});

        if (!lesson) {
            return res.status(400).send();
        }

        res.send(lesson)
    } catch (e) {
        res.status(500).send(e)
    }
};