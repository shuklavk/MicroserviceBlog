const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql;


const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: {type: GraphQLID},
    postId: {type: GraphQLID},
    content: {type: GraphQLString},
    status: {type: GraphQLString}
  })
});

module.exports = CommentType;