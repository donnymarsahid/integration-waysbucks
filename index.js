const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const indexRouter = require('./src/routes/indexRouter');
app.use('/api/v1', indexRouter);

app.listen(PORT, () => {
  console.log(`server is ok PORT:${PORT}`);
});

module.exports = app;
