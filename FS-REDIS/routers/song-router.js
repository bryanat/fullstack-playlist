/* Song Router acts as CRUD API endpoints for songs in song repository */

import { Router } from 'express';
import { songRepository } from '../om/song.js';

// export router to be imported in main express app server
export const router = Router()

// C (create) put song from JSON request object as a redis object into song repository
router.put('/', async (req, res) => {
  const song = await songRepository.createAndSave(req.body)
  // send back song as confirmation, currently reqest object + redis id (can change later)
  res.send(song)
})

// R (read) get song via search id from song repository
router.get('/:id', async (req, res) => {
  const song = await songRepository.fetch(req.params.id)
  res.send(song)
})

// get song via title search from song repository

// U (update) post song updating it in song repository
router.post('/:id', async (req, res) => {
  // first get the song to update
  const song = await songRepository.fetch(req.params.id)
  song.title = req.body.title ?? null
  await songRepository.save(song)
  // send back song as confirmation, currently reqest object + redis id (can change later)
  res.send(song)
})

// D (delete) delete song from song repository
router.delete('/:id', async (req, res) => {
  await songRepository.remove(req.params.id)
  // send back the entityId of deleted song to client
  res.send({ entityId: req.params.id})
  // log the entityId of deleted song on server
  console.log(`${req.params.id} has been deleted`)
})