import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { saveImagesInDateRange } from '../utils';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
// Define the static file path
app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

saveImagesInDateRange();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);