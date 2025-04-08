import app from './app.js';
import * as env from './config/dotenv.config.js';
import { connectDB } from './config/db.js';

connectDB().then(() => {
  app.listen(env.default.PORT || 3000, () => {
    console.log(`Server running on port ${env.default.PORT}`);
  });
});
