import { Injectable } from '@nestjs/common';
import { Task } from '../task/task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '@/config/redis';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>, private readonly redis: RedisService) {}

  async getAll() {
    const tasks = await this.taskModel.find().exec()
    const cachedTasks = await this.redis.get('tasks')
    const isCachedTasks = !(await this.redis.get('tasks:validation'))

    if (isCachedTasks) {
      const isRefetching = !!(await this.redis.get('tasks:is-refetching'))
      console.log({ isRefetching })
      if (!isRefetching) {
        await this.redis.set('tasks:is-refetching', 'true', 'EX', 20)
        setTimeout(async () => {
          console.log('cache is stale - refetching...')
          await this.redis.set('tasks', JSON.stringify(tasks))
          await this.redis.set('tasks:validation', 'true', 'EX', 5)
        }, 0)
      }
    }
    if(!cachedTasks) {
      await this.redis.set('tasks', JSON.stringify(tasks), 'EX', 15)
      console.log('\x1b[33m%s\x1b[0m', 'From Database')
      return tasks
    }

    console.log('\x1b[36m%s\x1b[0m', 'From Cache')
    return JSON.parse(cachedTasks)
  }

  async getById(id: string) {
    return await this.taskModel.findById(id).exec()
  }

  async create(task: Task) {
    const createdTask = new this.taskModel(task)
    return await createdTask.save()
  }

  async update(id: string, task: Task) {
    await this.taskModel.updateOne({ _id: id }, task).exec()
    return this.getById(id)
  }

  async delete(id: string) {
    return await this.taskModel.deleteOne({ _id: id }).exec()
  }
}
