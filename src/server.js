const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const app = express();
const config = require('./config/config');
const UserRoutes = require('./router/UserRoutes');
const fileUpload = require('express-fileupload');
const GamesRoutes = require('./router/GamesRoutes');

// Server configuration

app.use(helmet());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json({ limit: '50mb' }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
        limits: { fileSize: 10000000}, // 10mb max file(s) size
        abortOnLimit: true 
    })
)
app.use(cors({
    origin: [config.app.FRONT_URI],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
    );
    next();
});

app.use("/users", UserRoutes);
app.use("/games", GamesRoutes);

module.exports = app;