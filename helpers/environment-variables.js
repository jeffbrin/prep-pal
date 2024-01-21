import dotenv from "dotenv"
const env = dotenv.config().parsed

export const MONGODB_USERNAME = env.MONGODB_USERNAME
export const MONGODB_PASSWORD = env.MONGODB_PASSWORD