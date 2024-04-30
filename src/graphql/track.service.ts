import {Service} from 'typedi';
import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import {FindAllArgs, FindOneArgs} from './track.arguments.js';
import {getTrack} from '../services/acrmetadata.js';
import {DeletedTrack} from './types.js';

@Service()
export class TrackService {
  private db!: PouchDB.Database<{}>;

  private constructor(db: PouchDB.Database<{}>) {
    this.db = db;
  }

  delete = async (id: string) => {
    const docs = await this.getById(id);
    if (docs.length === 1) {
      await this.db.remove(docs[0]);
      return new DeletedTrack(id);
    }

    return undefined;
  };

  private getById = async (id: string) => {
    const {docs} = await this.db.find({
      selector: {
        _id: id,
      },
    });

    return docs;
  };

  get = async (id: string) => {
    const docs = await this.getById(id);

    if (docs.length === 1) {
      return docs[0];
    }

    return undefined;
  };

  static createTrackService = async () => {
    PouchDb.plugin(find);
    const db = new PouchDb('wer1');

    await db.createIndex({
      index: {fields: ['name', 'artist_name']},
    });

    await db.createIndex({
      index: {fields: ['id']},
    });

    return new TrackService(db);
  };

  findAll = async (args: FindAllArgs) => {
    const {rows} = await this.db.allDocs({
      include_docs: true,
      skip: args.skip,
      limit: args.take,
    });

    return rows.map(row => row.doc).filter(doc => !(doc as any)['language']);
  };

  findOne = async (args: FindOneArgs) => {
    const {docs} = await this.db.find({
      selector: {
        name: args.name,
        artist_name: args.artist_name,
      },
    });

    if (docs.length === 0) {
      const track = await getTrack(args.name, args.artist_name);
      if (
        track &&
        track.artist_name.toLowerCase() === args.artist_name.toLowerCase() &&
        track.name.toLowerCase() === args.name.toLowerCase()
      ) {
        await this.db.post(track);
        return track;
      }
    } else {
      return docs[0];
    }

    return undefined;
  };
}
