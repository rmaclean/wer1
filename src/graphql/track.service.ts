import {Inject, Service} from 'typedi';

@Service()
export class TrackService {
  @Inject('db')
  private db!: PouchDB.Database<{}>;

  findAll(args: { skip: number; take: number; }) {
    throw new Error('Method not implemented.');
  }
}
