import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TasksModule, MongooseModule.forRoot('mongodb+srv://db_user:WwbcNcLVkRaTatjQ@exemplos.xmdrwte.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
