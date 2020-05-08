const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = graphql;
const PostType = require('./post_type');
const { randomBytes } = require('crypto');
const axios = require('axios');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost:{
      type:PostType,
      args:{
        title: {type:GraphQLString}
      },
      resolve(parentValue, args){
        let id = randomBytes(4).toString('hex');
        return axios.post(`http://localhost:3003/posts`, {id, title:args.title})
        .then((resp) => {
          return axios.post(`http://localhost:4005/events`, {type:"PostCreated", data:resp.data})
          .then(resp => resp.data)
        });
      }
    }
  }
})

module.exports = mutation;