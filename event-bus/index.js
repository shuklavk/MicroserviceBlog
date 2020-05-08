const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const port = 4005;

app.use(bodyParser.json());

const events = [];

// {
//   "query": "...",
//   "operationName": "...",
//   "variables": { "myVariable": "someValue", ... }
// }
app.post("/events", (req,res)=>{
  const event = req.body;
  events.push(event);
  let query = "";
  if(event.type === "PostCreated"){
    query = 
    {
      "query": "query Event($type: String, $id: ID, $title: String){event(type: $type, id: $id, title: $title){id}}",
      "variables": {"type" : event.type, "id": event.data.id, "title":event.data.title}
    }
  }else if(event.type === 'CommentCreated' || event.type === 'CommentModerated' || event.type === 'CommentUpdated'){
    query = 
    {
      "query": "query Event($type: String, $id: ID, $content: String, $postId: ID, $status:String){event(type: $type, id: $id, content: $content, postId:$postId, status:$status){id}}",
      "variables": {"type" : event.type, "id": event.data.id, "content":event.data.content, "postId":event.data.postId, "status":event.data.status}
    }
  }
  axios.post(`http://localhost:4000/graphql`, query)
  // .then(resp => console.log("Data from Post Service:", resp.data))
  .catch(e => {
    console.log("ERROR IN POST")
  })
  axios.post(`http://localhost:4001/graphql`, query)
  .then(resp => console.log("Data from Comment Service:", resp.data))
  .catch(e => {
    console.log('ERROR IN COMMENT');
  });
  axios.post(`http://localhost:4002/events`, event);
  axios.post(`http://localhost:4003/events`, event);

  res.send({status:"OK"}); 
})

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(port, ()=>{console.log(`listening on port ${port}`)});