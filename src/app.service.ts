import { Injectable } from '@nestjs/common';
import { createClient } from 'redis'

const client = createClient()
@Injectable()
export class AppService {

  async getAllProducts(): Promise<string[]> {
    const time = Math.random() * 5000

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(['Produto 1', 'Produto2', 'Produto3'])
      }, time)
    })
  }
}
