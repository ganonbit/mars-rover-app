import { ApolloServer, gql } from 'apollo-server';
 
// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
 
new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      images: (parent, args, context, info) => {
        console.log(context.myProperty); // Will be `true`!
        return books;
      },
    }
  },
  context: async ({ req }) => {
    return {
      myProperty: true
    };
  },
})
 
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});