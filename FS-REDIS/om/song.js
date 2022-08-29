/* Song OM = Entity + Schema + Repository + Index acts as interface to perform Redis CRUD on songs */

import { Entity, Schema } from 'redis-om';
import client from './om-client.js';

// create a song entity for mapping Express JSON objects to Redis objects (using RedisJSON)
class Song extends Entity {}
// create a schema for the structure and fields of song entities
const songSchema = new Schema(Song, {
  title: { type: 'text'},
})
// create a song repository to perform crud on song entities
export const songRepository = client.fetchRepository(songSchema)
// create an index to search the song repository for songs (using RedisSearch)
await songRepository.createIndex()