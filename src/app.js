const express = require('express');

const config = {
  port: 3000,
};

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'welcome to librarium server api' });
});
app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
