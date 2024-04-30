import {Args, Mutation, Query, Resolver} from 'type-graphql';
import {Track} from './types.js';
import {FindAllArgs, FindOneArgs, GetOneArgs} from './track.arguments.js';
import {TrackService} from './track.service.js';
import {Service} from 'typedi';

@Service()
@Resolver(Track)
export class TrackResolver {
  constructor(private trackService: TrackService) {}

  @Query(returns => [Track])
  findAll(@Args() {skip, take}: FindAllArgs) {
    return this.trackService.findAll({skip, take});
  }

  @Query(returns => Track, {nullable: true})
  getOne(@Args() {id}: GetOneArgs) {
    return this.trackService.get(id);
  }

  @Mutation(returns => Track, {nullable: true})
  findOne(@Args() {name, artist_name}: FindOneArgs) {
    return this.trackService.findOne({name, artist_name});
  }
}
