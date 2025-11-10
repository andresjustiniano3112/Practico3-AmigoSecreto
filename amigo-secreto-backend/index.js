require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', require('./routes'));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`API ▶ http://localhost:${PORT}`));
});
