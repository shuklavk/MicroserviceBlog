const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CommentType = require('./comment_type');
const ResponseType = require('./response_type');
const axios = require('axios');

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { postId }) {
        return axios.get(`http://localhost:3002/posts/${postId}/comments`)
          .then((resp) => {
            return resp.data;
          })
          .catch((err) => {
            return [];
          })
      }
    },
    event: {
      type: ResponseType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        type: { type: GraphQLString },
        status: { type: GraphQLString },
        postId: { type: GraphQLID }
      },
      resolve(parentValue, {id, title, content, type, status, postId}){
        if(type === "CommentModerated"){
          const data = {id, content, postId, status}
          return axios.post(`http://event-bus-srv:4005/events`, {type: 'CommentUpdated', data})
            .then(resp => {
              console.log('sending moderated data:', resp.data);
              return resp.data
            });
          // return axios.patch(`http://localhost:3002/comments/${id}`, {status})
          // .then(resp => {
          //   return axios.post(`http://localhost:4005/events`, {type: 'CommentUpdated', data:resp.data})
          //   .then(resp => {
          //     console.log('sending moderated data:', resp.data);
          //     return resp.data
          //   });
          // })
        }else{
          console.log("EVENT RECIEVED:", type);
          return {id}
        }
      }
    }
  })
})

module.exports = RootQuery;