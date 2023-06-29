const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: ".env.development" })
} else {
    dotenv.config({ path: ".env.production" })

}

const ENV = process.env.NODE_ENV || "development";

const CONFIG = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            MONGO_URI: process.env.MONGO_URI
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4008
        },
        db: {
            MONGO_URI: process.env.MONGO_URI
        }
    }
}

module.exports = CONFIG[ENV];