const express = require('express');
const schoolRouter = require('./routers/school');
const teacherRouter = require('./routers/teacher');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(schoolRouter);
app.use(teacherRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})