import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    CLIENT_URL : process.env.CLIENT_URL,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    MAIL_HOST : process.env.MAIL_HOST,
    MAIL_PORT : process.env.MAIL_PORT,
    MAIL_USER : process.env.MAIL_USER,
    MAIL_PASS : process.env.MAIL_PASS,

}