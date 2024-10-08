import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import connectDB from "./config/db.js";

// coneect to database
connectDB();

const server = new ApolloServer({
  // type definitions
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT },
});

console.log("server started");
