
import dotenv from "dotenv"
const env = dotenv.config().parsed

export const MONGODB_USERNAME = env.MONGODB_USERNAME
export const MONGODB_PASSWORD = env.MONGODB_PASSWORD
export const OPENAI_API_KEY = env.OPENAI_API_KEY