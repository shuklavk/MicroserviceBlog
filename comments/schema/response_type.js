const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql;


const ResponseType = new GraphQLObjectType({
  name: 'ResponseType',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    type: {type:GraphQLString},
    status: {type:GraphQLString},
    postId: {type:GraphQLID}
  })
})

module.exports = ResponseType;