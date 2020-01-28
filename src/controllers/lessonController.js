const Lesson = require('../models/lesson');
const Group = require('../models/group');

exports.lesson_post = async (req, res) => {
  const group = await Group.find({});
  const lesson = new Lesson({
    ...req.body,
    // eslint-disable-next-line no-underscore-dangle
    teacher: req.teacher._id,
    class: group,
  });

  try {
    await lesson.save();
    res.status(201).send(lesson);
  } catch (e) {
    res.status(401).send(e);
  }
};

// eslint-disable-next-line consistent-return
exports.lesson_patch = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['theme', 'teacher', 'groupOfPupils', 'statDate', 'endDate'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // eslint-disable-next-line no-underscore-dangle
    const lesson = await Lesson.findOne({ _id: req.params.id, teacher: req.teacher._id });

    if (!lesson) {
      return res.status(404).send();
    }

    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => lesson[update] = req.body[update]);
    await lesson.save();

    res.send(lesson);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.lessons_get = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const lesson = await Lesson.find({ teacher: req.teacher._id });
    // await req.teacher.populate('lesson').execPopulate();
    res.send(lesson);
  } catch (error) {
    res.send(error);
  }
};

// eslint-disable-next-line consistent-return
exports.lesson_getID = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  try {
    // const lesson = await Lesson.findById(_id);
    // eslint-disable-next-line no-underscore-dangle
    const lesson = await Lesson.findOne({ _id, teacher: req.teacher._id });
    if (!lesson) {
      return res.status(404).send();
    }

    res.status(200).send(lesson);
  } catch (e) {
    res.status(500).send({ e: 'Not found' });
  }
};

// eslint-disable-next-line consistent-return
exports.lesson_delete = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const lesson = await Lesson.findOneAndDelete({ _id: req.params.id, teacher: req.teacher._id });

    if (!lesson) {
      return res.status(400).send();
    }

    res.send(lesson);
  } catch (e) {
    res.status(500).send(e);
  }
};
