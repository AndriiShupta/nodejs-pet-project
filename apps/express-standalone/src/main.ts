/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/express/assets', express.static(path.join(__dirname, 'assets')));

app.get('/express/health', (req, res) => {
  res.send({ message: 'Welcome to express-standalone!' });
});

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/express`);
});
server.on('error', console.error);
