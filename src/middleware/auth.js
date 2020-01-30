/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const Teacher = require('../models/teacher');

const auth = async (req, res, next) => {
  try {
    const secretWord = process.env.JWT_SECRET;

    const token = req.header('Authorization').replace('Bearer ', '');
    if (typeof token !== 'undefined') {
      const decipher = jwt.verify(token, secretWord);
      const teacher = await Teacher.findOne({ _id: decipher._id, 'tokens.token': token });

      if (!teacher) {
        throw new Error();
      }

      req.token = token;
      req.teacher = teacher;
    }
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
