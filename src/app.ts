import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schemas/index.js";
import { GraphQLError } from "graphql";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer<ContextApollo>({ typeDefs, resolvers });

await apolloServer.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new GraphQLError("Unauthenticated request", {
          extensions: { code: "Unauthenticated", http: { status: 401 } },
        });
      }
      return {
        field01: "aa",
      };
    },
  })
);

connectDB()
  .then(async () => {
    console.log("Mongodb is connected!");
    httpServer.listen({ port: 3000 });
  })
  .catch((err) => console.log(err));