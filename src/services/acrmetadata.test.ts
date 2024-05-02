import { getTrack } from './acrmetadata';
import { Track } from '../graphql/track.types';
import { describe, expect, it, mock } from "bun:test";

describe('get track', () => {
  it('should return a Track object with the correct data', async () => {
    global.fetch = mock().mockResolvedValueOnce({
      ok: true,
      json: mock().mockResolvedValueOnce({ data: [
        {
          artists: [{ name: 'Test Artist' }],
          duration_ms: 240000,
          name: 'Test Track',
          isrc: 'ABCD12345678',
          album: { release_date: '2023-04-01' }
        }
      ] }),
    });

    const track = await getTrack('Test Track', 'Test Artist');
    expect(track).toBeInstanceOf(Track);
    expect(track.name).toBe('Test Track');
    expect(track.artist_name).toBe('Test Artist');
    expect(track.duration).toBe(240000);
    expect(track.IRSC).toBe('ABCD12345678');
    expect(track.release_date).toEqual(new Date('2023-04-01'));
  });

  it('should throw an error if no tracks are found', async () => {
    global.fetch = mock().mockResolvedValueOnce({
      ok: true,
      json: mock().mockResolvedValueOnce({ data: [] }),
    });

    expect(getTrack('Non-existent Track', 'Non-existent Artist')).rejects.toThrow(
      'No tracks found'
    );
  });

  it('should throw an error if the API request fails', async () => {
    global.fetch = mock().mockResolvedValueOnce({
      ok: false,
      text: mock().mockResolvedValueOnce("API error"),
    });

    expect(getTrack('Test Track', 'Test Artist')).rejects.toThrow('API error');
  });
});
