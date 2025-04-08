import app from './app.js';
import * as env from './config/dotenv.config.js';

app.listen(env.default.PORT || 3000, () => {
  console.log(`Server running on port ${env.default.PORT}`);
});
