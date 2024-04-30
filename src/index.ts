import 'reflect-metadata';
import {ApolloServer} from '@apollo/server';
import {buildSchema} from 'type-graphql';
import {TrackResolver} from './graphql/track.resolver.js';
import {Container} from 'typedi';
import {TrackService} from './graphql/track.service.js';
import {Config} from './config.js';
import {AuthResolver} from './graphql/auth.resolver.js';
import {tokenAuthChecker} from './graphql/auth.checker.js';
import express from 'express';
import {expressjwt} from 'express-jwt';
import {expressMiddleware} from '@apollo/server/express4';
import bodyParser from 'body-parser';

const config = Container.get(Config);

if (!config.valid()) {
  console.error(
    'Invalid config - please check the docs to set the environmental variables and try again...'
  );
  throw new Error('Invalid config');
}

// this is because it is a demo; would like to have a more seperate DB that has smarter spin up
// for the demo, linking it into track service and having a special constructor is a fair
// tradeoff.
Container.set(TrackService, await TrackService.createTrackService());

const schema = await buildSchema({
  resolvers: [TrackResolver, AuthResolver],
  container: Container,
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
