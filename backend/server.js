const app = require('./app');
const connectDatabase = require('./config/database');

connectDatabase();

const server = app.listen(process.env.PORT,() => {
    console.log(`Server Listening to the Port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
