import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 5555

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*'
  })
  await app.listen(port, () => {
    console.log(`localhost:${port}`)
  });
}
bootstrap();
