const app = require('./server');
const config = require('./config/config');
const connectDB = require('./db/connect')


// Connect to database

connectDB()
    .then(() => {
        console.log('Database connected!');
        app.listen(config.app.PORT, () => {
            console.log(`Server is running on port ${config.app.PORT}`);
        })
    })
    .catch((err) => console.error(err));


