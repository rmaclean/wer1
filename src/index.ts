import 'reflect-metadata';
import {ApolloServer} from '@apollo/server';
import {buildSchema} from 'type-graphql';
import {TrackResolver} from './graphql/track.resolver';
import {Container} from '@freshgum/typedi';
import { Config } from './config';
import {AuthResolver} from './graphql/auth.resolver';
import {tokenAuthChecker} from './graphql/auth.checker';
import express from 'express';
import {expressjwt} from 'express-jwt';
import {expressMiddleware} from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { Database } from './services/database';

const database = await new Database().createDBInstance();
Container.set({id: "DB", value: database});
const config = Container.get(Config);

if (!config.valid()) {
  console.error(
    'Invalid config - please check the docs to set the environmental variables and try again...'
  );
  throw new Error('Invalid config');
}

const schema = await buildSchema({
  resolvers: [TrackResolver, AuthResolver],
  container: {
    get: (type) => {
      return Container.get(type)
    }
  },
  authChecker: tokenAuthChecker,
});

const server = new ApolloServer({schema});
await server.start();

const app = express();

app.use(
  config.graphqlPath,
  expressjwt({
    secret: config.accessTokenSecret!,
    credentialsRequired: false,
    algorithms: ['HS256'],
  })
);

app.use(
  config.graphqlPath,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({req}) => ({token: req.headers.authorization}),
  })
);

await new Promise<void>(resolve => app.listen({port: config.port}, resolve));

console.log(
  `🎶 The server hums to life; letting its song playout at http://localhost:${config.port}${config.graphqlPath}`
);
