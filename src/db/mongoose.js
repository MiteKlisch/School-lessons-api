const mongoose = require('mongoose');


//const connectionURL = 'mongodb://127.0.0.1:27017/school-api';

mongoose.connect('mongodb://127.0.0.1:27017/school-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


