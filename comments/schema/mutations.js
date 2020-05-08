const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString} = graphql
const CommentType = require('./comment_type');
const axios = require('axios');
const {randomBytes} = require('crypto');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    postComment:{
      type: CommentType,
      args: {
        postId : {type: GraphQLID},
        content: {type: GraphQLString}
      },
      resolve(parentValue, {postId, content}){
        let id = randomBytes(4).toString('hex');
        return axios.post(`http://localhost:3002/posts`, {"id":postId})
        .then((resp)=> {
          return axios.post(`http://localhost:3002/posts/${postId}/comments`, {id,content, status:"pending"})
          .then((resp) => { 
            console.log(resp.data); 
            return axios.post(`http://localhost:4005/events`, {type:"CommentCreated", data:resp.data})
            .then(resp =>resp.data);
          })
        })
        .catch((err) => {
          return axios.post(`http://localhost:3002/posts/${postId}/comments`, {id,content, status:"pending"})
          .then((resp) => { 
            console.log(resp.data); 
            return axios.post(`http://localhost:4005/events`, {type:"CommentCreated", data:resp.data})
            .then(resp =>resp.data);
          })
        })
      }
    }
  })
})

module.exports = mutation;