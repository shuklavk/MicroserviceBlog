const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql;

const EventType = new GraphQLObjectType({
  name:"EventType",
  fields: () => ({
    id: {type:GraphQLID},
    postId:{type:GraphQLID},
    title:{type:GraphQLString},
    content:{type:GraphQLString},
    status:{type:GraphQLString},
    type:{type:GraphQLString}
  })
})

module.exports = EventType;