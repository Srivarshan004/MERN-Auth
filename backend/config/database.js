const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then((connect) => {
        console.log(`MongoDB is connect to the host : ${connect.connection.host}`);
    }).catch((error) => {
        console.log('MongoDB Connection Error : ', error)
    })
}

module.exports = connectDatabase;