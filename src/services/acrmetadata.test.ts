import { getTrack } from './acrmetadata';
import { Container } from '@freshgum/typedi';
import { Track } from '../graphql/track.types';
import { describe, beforeEach, expect, it } from "bun:test";

describe('getTrack', () => {
  beforeEach(() => {
    Container.reset();
  });

  it('should return a Track object with the correct data', async () => {
    const track = await getTrack('Test Track', 'Test Artist');
    expect(track).toBeInstanceOf(Track);
    expect(track.name).toBe('Test Track');
    expect(track.artist_name).toBe('Test Artist');
    expect(track.duration).toBe(240000);
    expect(track.IRSC).toBe('ABCD12345678');
    expect(track.release_date).toEqual(new Date('2023-04-01'));
  });

  it('should throw an error if no tracks are found', async () => {
    await expect(getTrack('Non-existent Track', 'Non-existent Artist')).rejects.toThrow(
      'No tracks found'
    );
  });

  it('should throw an error if the API request fails', async () => {
    await expect(getTrack('Test Track', 'Test Artist')).rejects.toThrow('API error');
  });
});
