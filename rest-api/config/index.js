
import  dotenv from 'dotenv';
dotenv.config()

// export the env file variables
export const { APP_PORT, DB_URL, DEBUG_MODE, JWT_SECRET } = process.env;
