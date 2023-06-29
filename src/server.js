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
    origin: [config.db.MONGO_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use("/users", UserRoutes);

module.exports = app;