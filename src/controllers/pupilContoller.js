const Pupil = require('../models/pupil');

exports.pupil_post = async (req, res) => {
  const pupil = new Pupil(req.body);

  try {
    await pupil.save();
    // const token = await pupil.generateAuthToken();
    res.status(201).send(pupil);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.pupil_patch = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // eslint-disable-next-line max-len
    const pupil = await Pupil.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });


    if (!pupil) {
      res.status(404).send();
    }

    res.send(pupil);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.pupils_get = async (req, res) => {
  // res.send(req.pupil);
  try {
    const pupil = await Pupil.find({});
    res.send(pupil);
  } catch (error) {
    res.status(500).send(error);
  }
};

// eslint-disable-next-line consistent-return
exports.pupil_get = async (req, res) => {
// eslint-disable-next-line no-underscore-dangle
  const _id = req.params.id;
  try {
    const pupil = await Pupil.findById(_id);
    if (!pupil) {
      return res.status(404).send();
    }

    res.status(200).send(pupil);
  } catch (e) {
    res.status(500).send({ e: 'Not found' });
  }
};

exports.pupil_delete = async (req, res) => {
  try {
    // await req.pupil.remove();
    // res.send(req.pupil);
    const pupil = await Pupil.findByIdAndDelete(req.params.id);
    if (!pupil) {
      res.status(404).send();
    }

    res.send(pupil);
  } catch (e) {
    res.status(500).send(e);
  }
};
