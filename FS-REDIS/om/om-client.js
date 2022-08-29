/* OM Client acts as a client connection to Redis using Node Redis */

import { Client } from 'redis-om'
import { createClient } from 'redis'

// get Redis url from .env (for security and dynamic deployment)
const url = process.env.REDIS_URL

// create a Node Redis client and connect it to Redis
export const connection = createClient({ url })
await connection.connect()

// create a Redis OM client and connect it to the Node Redis client
const client = await new Client().use(connection)

export default client