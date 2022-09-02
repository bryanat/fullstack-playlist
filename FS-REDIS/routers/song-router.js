/* Song Router acts as CRUD API endpoints for songs in song repository */

import { Router } from 'express';
import { songRepository } from '../om/song.js';
import fs from 'fs'

// directory path on local filesystem
const serverPath = process.env.serverPath

// export router to be imported in main express app server
export const router = Router()

// C (create) put song from JSON request object as a redis object into song repository
router.put('/', async (req, res) => {
  const song = await songRepository.createAndSave(req.body)
  // send back song as confirmation, currently reqest object + redis id (can change later)
  res.send(song)
})


// C (create) create song via title search from song repository
router.put('/add/:fileNameAtUpload', async (req, res) => {
  const parsedName = req.params.fileNameAtUpload.replaceAll("_", " ")
  const songObject = {
    title : parsedName
  }

  const song = await songRepository.createAndSave(songObject)
  // the entityId is what matters, as it is used to connect the metadata and data (song .mp3 file)
  console.log(`${song.entityId} Created.`)

  fs.rename(`${serverPath}/data/${req.params.fileNameAtUpload}`, `${serverPath}/data/${song.entityId}.mp3`, async err => {
    if (err) {
      songRepository.remove(song.entityId)
      console.log(`${song.entityId} Removed due to error renaming file.`)
      return console.error(err);
    }
  })

})

// R (read) get song via search id from song repository
router.get('/:id', async (req, res) => {
  const song = await songRepository.fetch(req.params.id)
  res.send(song)
})

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