import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['GOOGLE_VISION_API_KEY', 'OPENAI_API_KEY'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export default process.env;
