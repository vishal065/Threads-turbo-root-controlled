import { ApolloServer, type BaseContext } from "@apollo/server";
import { User } from "./user/index.js";
async function createApolloGraphqlServer(): Promise<ApolloServer<BaseContext>> {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql

        type Query{
            ${User.queries}
        
        }
        type Mutation{
            ${User.mutations}
            hello:String
        }

    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphqlServer;
