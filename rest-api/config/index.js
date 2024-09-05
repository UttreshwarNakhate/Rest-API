
import  dotenv from 'dotenv';
dotenv.config()

// export the env file variables
export const { APP_PORT, DEBUG_MODE, DB_URL } = process.env;
