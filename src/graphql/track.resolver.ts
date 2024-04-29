import {Args, Query, Resolver} from 'type-graphql';
import {Track} from './types.js';
import {FindAllArgs, FindOneArgs} from './track.arguments.js';
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

  @Query(returns => Track)
  findOne(@Args() {name, artist_name}: FindOneArgs) {
    return this.trackService.findOne({name, artist_name});
  }
}
