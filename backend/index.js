const express = require('express');
const app = express();
const paginate = require('./utils/paginate');

const photofeed = require('./data/photofeed');
const videofeed = require('./data/videofeed');
const reelfeed = require('./data/reelfeed');

const PORT = 3000;

app.get('/photofeed', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  res.json(paginate(photofeed, page));
});

app.get('/videofeed', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  res.json(paginate(videofeed, page));
});

app.get('/reelfeed', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  res.json(paginate(reelfeed, page));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
