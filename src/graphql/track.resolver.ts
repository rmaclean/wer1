import {Args, Authorized, Mutation, Query, Resolver} from 'type-graphql';
import {DeletedTrack, Track} from './track.types.js';
import {
  FindAllArgs,
  FindOneArgs,
  GetOneArgs,
  UpdateTrack,
} from './track.arguments.js';
import {TrackService} from './track.service.js';
import {Service} from 'typedi';

@Service()
@Resolver(Track)
export class TrackResolver {
  constructor(private trackService: TrackService) {}

  @Authorized()
  @Query(returns => [Track])
  findAll(@Args() {skip, take}: FindAllArgs) {
    return this.trackService.findAll({skip, take});
  }

  @Authorized()
  @Query(returns => Track, {nullable: true})
  getOne(@Args() {id}: GetOneArgs) {
    return this.trackService.get(id);
  }

  @Authorized()
  @Mutation(returns => Track, {nullable: true})
  updateOne(@Args() track: UpdateTrack) {
    return this.trackService.update(track);
  }

  @Authorized()
  @Mutation(returns => DeletedTrack, {nullable: true})
  deleteOne(@Args() {id}: GetOneArgs) {
    return this.trackService.delete(id);
  }

  @Authorized()
  @Mutation(returns => Track, {nullable: true})
  findOne(@Args() {name, artist_name}: FindOneArgs) {
    return this.trackService.findOne({name, artist_name});
  }
}
