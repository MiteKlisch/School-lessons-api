const express = require('express');
const schoolRouter = require('./routers/index')
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(schoolRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})