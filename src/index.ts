import 'reflect-metadata';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {buildSchema} from 'type-graphql';
import {TrackResolver} from './graphql/track.resolver.js';
import {Container} from 'typedi';
import {TrackService} from './graphql/track.service.js';

Container.set(TrackService, await TrackService.createTrackService());

const schema = await buildSchema({
  resolvers: [TrackResolver],
  container: Container,
});

const server = new ApolloServer({schema});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
});

console.log(`🎶 The server hums to life; letting its song playout at ${url}`);
