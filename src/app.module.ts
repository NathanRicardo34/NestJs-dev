import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './config/prisma';
import { RedisService } from './config/redis';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://db_user:WwbcNcLVkRaTatjQ@exemplos.xmdrwte.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
