import express from 'express';
import db from './config/connection';
import routes from './routes/index.js'

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});