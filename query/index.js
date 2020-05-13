const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require('axios');

const app = express();
const port = 4002;

app.use(bodyParser.json());
app.use(cors());

const post = {};  
const handleEvent = (type, data) => {
  if(type === "PostCreated"){
    console.log('postCreated: ', data)
    const {id, title} = data;
    post[id] = {id, title, comments:[]}
  }else if (type === "CommentCreated"){
    console.log('comment Created: ', data)
    const {id, content, postId, status} = data;
    post[postId].comments.push({id, content, status});
  }else if(type === 'CommentUpdated'){
    const {id, content, postId, status} = data;
    const onePost = post[postId];
    const comment = onePost.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
}

app.get("/posts", (req, res) =>{
  res.send(post);
});

app.post("/events", (req, res)=>{
  const {type, data} = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(port, async()=> {
  console.log(`Listening on port ${port}`);
  const res = await axios.get(`http://event-bus-srv:4005/events`);

  for(let event of res.data){
    console.log('Processing Event ', event.type);

    handleEvent(event.type, event.data);
  }
})