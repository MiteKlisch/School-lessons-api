const express = require('express');
const lessonRouter = require('./routers/lesson');
const teacherRouter = require('./routers/teacher');
const pupilRouter = require('./routers/pupils');
const groupRouter = require('./routers/group');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(lessonRouter);
app.use(teacherRouter);
app.use(pupilRouter);
app.use(groupRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})