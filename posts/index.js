const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 4000


app.use('/graphqlPost', expressGraphQL({
  schema,
  graphiql:true
}))

app.post('/events', (req, res)=>{
  console.log('Recieved Event', req.body.type);

  res.send({})
})

app.listen(port, () => {
  console.log('v10000');
  console.log(`Listening at http://localhost:${port}`)})