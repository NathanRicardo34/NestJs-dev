import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5555
  app.enableCors({
    origin: '*'
  })
  await app.listen(port);
  console.log(`localhost:${port}`)
}
bootstrap();
