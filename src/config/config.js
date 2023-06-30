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
            PORT: process.env.PORT || 4001,
            FRONT_URI: process.env.FRONT_URI
        },
        db: {
            MONGO_URI: process.env.MONGO_URI
        },
        cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4008,
            FRONT_URI: process.env.FRONT_URI
        },
        db: {
            MONGO_URI: process.env.MONGO_URI
        },
        cloudinary: { 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        }
    }
}

module.exports = CONFIG[ENV];