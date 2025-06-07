const express = require('express');
const app = express();
const posts = require('./data'); // Import your dummy data

const PORT = 3000;

app.get('/content', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = posts.slice(startIndex, endIndex);

  res.json(paginatedData);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
