const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PostType = require('./post_type');
const EventType = require('./event_type');
const axios = require('axios');

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3003/posts`)
          .then((resp) => {
            return resp.data
          });
      }
    },
    event: {
      type: EventType,
      args: {
        id: {type:GraphQLID},
        postId: {type:GraphQLID},
        title: {type:GraphQLString},
        content: {type:GraphQLString},
        status: {type:GraphQLString},
        type:{type:GraphQLString}
      },
      resolve(parentValue, args){
        return {id};
      }
    }
    // postEvent: {
    //   type: PostType,
    //   args: {
    //     type: { type: GraphQLString },
    //     id: { type: GraphQLID },
    //     title: {type: GraphQLString}
    //   },
    //   resolve(parentValue, { type, id, title }) {
    //     return {id, title};
    //   }
    // },
    // commentEvent: {
    //   type: PostType,
    //   args: {
    //     type:{type: GraphQLString},
    //     id:{type:GraphQLID},
    //     postId: {type:GraphQLID},
    //     content: {type: GraphQLString}
    //   },
    //   resolve(parentValue, {type, id, postId, content}){
    //     return {id}
    //   }
    // }
  })
})

module.exports = RootQuery;