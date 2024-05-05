import { beforeEach, describe, expect, it, mock, afterEach } from "bun:test";
import { TrackService } from './track.service';
import PouchDB from "pouchdb";
import memory from 'pouchdb-adapter-memory'
import find from 'pouchdb-find';
import { Database } from '../services/database';
import { ACRMetadata } from '../services/acrmetadata';
import { Track } from './track.types';

PouchDB.plugin(find).plugin(memory);

const getTrackMock = mock();
mock.module('../services/arcmetadata', () => {
  return {
    getTrack: getTrackMock,
  }
})

describe('track service', () => {
  let pouchdb: PouchDB.Database<object>;
  beforeEach(() => {
    pouchdb = new PouchDB('test', { adapter: 'memory' });
    Database.createIndexes(pouchdb);
  });

  afterEach(async () => {
    await pouchdb.destroy();
  });

  const createTrack = (values?: Partial<Track>): Track => {
    return {
      _id: values?._id ?? '0',
      name: values?.name ?? 'BASE',
      artist_name: values?.artist_name ?? 'BASE',
      created_at: values?.created_at ?? new Date(),
      duration: values?.duration ?? 0,
      IRSC: values?.IRSC ?? "123123",
      release_date: values?.release_date ?? new Date(),
      updated_at: values?.updated_at ?? new Date(),
    } as Track
  };

  const validateTracks = (actual: Track | PouchDB.Core.ExistingDocument<object>, expected: Track) => {
    expect(actual._id).toEqual(expected._id);
    if ("_rev" in actual) {
      expect(actual._rev).toBeTruthy();
    }

    if ("name" in actual) {
      expect(actual.name).toEqual(expected.name);
    }

    if ("artist_name" in actual) {
      expect(actual.artist_name).toEqual(expected.artist_name);
    }

    if ("duration" in actual) {
      expect(actual.duration).toEqual(expected.duration);
    }

    if ("IRSC" in actual) {
      expect(actual.IRSC).toEqual(expected.IRSC);
    }

    if ("release_date" in actual) {
      expect(new Date(actual.release_date)).toEqual(expected.release_date);
    }

    if ("updated_at" in actual) {
      expect(new Date(actual.updated_at)).toEqual(expected.updated_at);
    }

    if ("created_at" in actual) {
      expect(new Date(actual.created_at)).toEqual(expected.created_at);
    }
  }

  it('should return undefined from update for an invalid track', async () => {
    const trackService = new TrackService(pouchdb, new ACRMetadata());
    const result = await trackService.update({
      _id: '0',
    });
    expect(result).toBeUndefined();
  });

  it('should return undefined from delete for an invalid track', async () => {
    const trackService = new TrackService(pouchdb, new ACRMetadata());
    const result = await trackService.delete('0');
    expect(result).toBeUndefined();
  });

  it('should return undefined from get for an invalid track', async () => {
    const trackService = new TrackService(pouchdb, new ACRMetadata());
    const result = await trackService.get('0');
    expect(result).toBeUndefined();
  });

  it('should return empty array from findAll for an invalid track', async () => {
    const trackService = new TrackService(pouchdb, new ACRMetadata());
    const result = await trackService.findAll({ skip: 0, take: 10 });
    expect(result).toEqual([]);
  });

  it('should return empty array from findAll for an invalid track', async () => {
    const trackService = new TrackService(pouchdb, new ACRMetadata());
    const result = await trackService.findAll({ skip: 0, take: 10 });
    expect(result).toEqual([]);
  });

  it('should return undefined if item does not exist, and track service returns nothing, when calling findOne', async () => {
    const acrMetadata = new ACRMetadata();
    acrMetadata.getTrack = mock().mockResolvedValueOnce(undefined);
    const trackService = new TrackService(pouchdb, acrMetadata);
    const result = await trackService.findOne({ name: 'abc', artist_name: 'abc' });
    expect(result).toBeUndefined();
  });

  it('should return undefined if item does not exist, and track service returns an incorrect fuzzy match, when calling findOne', async () => {
    const acrMetadata = new ACRMetadata();
    acrMetadata.getTrack = mock().mockResolvedValueOnce(createTrack());
    const trackService = new TrackService(pouchdb, acrMetadata);
    const result = await trackService.findOne({ name: 'abc', artist_name: 'abc' });
    expect(result).toBeUndefined();
  });

  it('should return the track if item does not exist, and track service returns a valid track, when calling findOne', async () => {
    const acrMetadata = new ACRMetadata();
    const track = createTrack({
      artist_name: "abc",
      name: "abc",
    });
    acrMetadata.getTrack = mock().mockResolvedValueOnce(track);
    const trackService = new TrackService(pouchdb, acrMetadata);
    const result = await trackService.findOne({ name: 'abc', artist_name: 'abc' });
    expect(result).toEqual(track);
  });

  it('should return the track if item does not exist, and track service returns a valid track even if the track title or artist has different casing, when calling findOne', async () => {
    const acrMetadata = new ACRMetadata();
    const track = createTrack({
      artist_name: "ABC",
      name: "ABC",
    });

    acrMetadata.getTrack = mock().mockResolvedValueOnce(track);
    const trackService = new TrackService(pouchdb, acrMetadata);
    const result = await trackService.findOne({ name: 'abc', artist_name: 'abc' });
    expect(result).toEqual(track);
  });

  it('should return the existing track if item does when calling findOne', async () => {
    const acrMetadata = new ACRMetadata();
    const track = createTrack();
    acrMetadata.getTrack = mock().mockResolvedValueOnce(track);
    const trackService = new TrackService(pouchdb, acrMetadata);
    await trackService.findOne({ name: 'BASE', artist_name: 'BASE' });
    const result = await trackService.findOne({ name: 'BASE', artist_name: 'BASE' });

    expect(acrMetadata.getTrack).toHaveBeenCalledTimes(1);
    validateTracks(result!, track);
  });
});

