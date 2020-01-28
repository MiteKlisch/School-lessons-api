const Teacher = require('../models/teacher');

exports.teacher_post = async (req, res) => {
  const teacher = new Teacher(req.body);

  try {
    await teacher.save();
    const token = await teacher.generateAuthToken();
    res.status(201).send({ teacher, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.teacher_login = async (req, res) => {
  try {
    const teacher = await Teacher.findByCredentials(req.body.email, req.body.password);
    const token = await teacher.generateAuthToken();
    res.send({ teacher, token });
  } catch (error) {
    res.status(400).send();
  }
};

exports.teacher_logout = async (req, res) => {
  try {
    req.teacher.tokens = req.teacher.tokens.filter((token) => token.token !== req.token);

    await req.teacher.save();
    res.status(200).send('You logged out!');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.teacher_logoutAll = async (req, res) => {
  try {
    req.teacher.tokens = [];
    await req.teacher.save();
    res.send('Logged out All!');
  } catch (error) {
    res.status(500).send();
  }
};

exports.teacher_patch = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id);

    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => req.teacher[update] = req.body[update]);
    await req.teacher.save();
    res.send(req.teacher);
    // eslint-disable-next-line no-undef
    if (!teacher) {
      res.status(404).send();
    }

    // eslint-disable-next-line no-undef
    res.send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.teacher_getMe = async (req, res) => {
  res.send(req.teacher);
};

// eslint-disable-next-line consistent-return
exports.teacher_getID = async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  try {
    const teacher = await Teacher.findById(_id);
    if (!teacher) {
      return res.status(404).send();
    }

    res.status(200).send(teacher);
  } catch (e) {
    res.status(500).send({ e: 'Not found' });
  }
};

exports.teacher_delete = async (req, res) => {
  try {
    await req.teacher.remove();
    res.send(req.teacher);
  } catch (e) {
    res.status(500).send(e);
  }
};
