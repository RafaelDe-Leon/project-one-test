const express = require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://127.0.0.1:5502',
  })
);

app.get('/data', (req, res) => {
  res.json({ name: 'rafael', favoriteFood: 'chicken' });
});

app.listen(3000);
