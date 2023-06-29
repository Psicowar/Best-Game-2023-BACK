const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const app = express();
const config = require('./config/config');
const UserRoutes = require('./router/UserRoutes');

// Server configuration

app.use(helmet());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: [config.app.FRONT_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use((req, res, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
    );
    next();
});

app.use("/users", UserRoutes);

module.exports = app;