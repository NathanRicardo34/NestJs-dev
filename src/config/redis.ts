import { Injectable } from '@nestjs/common';
import { Redis } from "ioredis";

@Injectable()
export class RedisService extends Redis {
  constructor(redis) {
    super(redis)
    super.connect()
    super.on('error', (err) => {
      console.log('Error on Redis')
      console.error(err)
      process.exit(1)
    })

    super.on('connect', () => {
      console.log('Redis connected!')
    })
  }
}
