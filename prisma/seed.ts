import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  await prisma.task.deleteMany()

  const promises = []

  for (let i = 0; i < 2; i++) {
    const task = prisma.task.create({
        data: {
          description: `Tarefa ${i}`,
          completed: false,
        }
      })
    promises.push(task as never)
  }
  await Promise.all(promises)
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })
