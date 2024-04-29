import {Args, Query, Resolver} from 'type-graphql';
import {Track} from './types.js';
import {TracksArgs} from './track.arguments.js';
import {TrackService} from './track.service.js';

@Resolver(Track)
export class TrackResolver {
  constructor(private trackService: TrackService) {}

  @Query(returns => [Track])
  tracks(@Args() {skip, take}: TracksArgs) {
    return this.trackService.findAll({skip, take});
  }
}
