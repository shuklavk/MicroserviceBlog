const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors());
const port = 4001;

app.use("/graphql", expressGraphQL({
  schema,
  graphiql: true
}))

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body.type);

  res.send({})
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));