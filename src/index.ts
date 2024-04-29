import 'reflect-metadata';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {buildSchema} from 'type-graphql';
import {TrackResolver} from './graphql/track.resolver.js';
import PouchDB from 'pouchdb';

const db = new PouchDB('wer1');

const schema = await buildSchema({
  resolvers: [TrackResolver],
});

const server = new ApolloServer({schema});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
});

console.log(`🎶 The server hums to life; letting its song playout at ${url}`);
