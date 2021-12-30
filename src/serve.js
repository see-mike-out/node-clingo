const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const NC = require('./index.js')

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/run', async (req, res) => {
  let store = new NC.ClingoStore(req.body.config || {});
  store.addStatements(req.body.statements || []);
  store.addFiles(req.body.files || []);
  let output = await store.run();
  res.send(output);
})

app.listen(port);