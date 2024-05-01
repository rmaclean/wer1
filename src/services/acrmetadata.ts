import { Container } from '@freshgum/typedi';
import { Config } from '../config';
import { Track } from '../graphql/track.types';
import type { ArcMetadata } from './arcmetadata';

export const getTrack = async (
  name: string,
  artist_name: string
): Promise<Track> => {
  const config = Container.get(Config);
  const result = await fetch(
    `https://eu-api-v2.acrcloud.com/api/external-metadata/tracks?query={"track":"${name}", "artists":["${artist_name}"]}`,
    {
      headers: {
        Authorization: `Bearer ${config.acrToken}`,
      },
    }
  );

  if (result.ok) {
    const { data } = (await result.json()) as ArcMetadata;
    if (data.length === 0) {
      throw new Error('No tracks found');
    }

    const trackData = data[0];

    const track = new Track();

    Object.assign(track, {
      artist_name: trackData.artists[0].name,
      duration: trackData.duration_ms,
      name: trackData.name,
      IRSC: trackData.isrc,
      release_date: new Date(trackData.album.release_date),
    });

    return track;
  } else {
    throw new Error(await result.text());
  }
};
