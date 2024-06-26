import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { TasksModule } from './tasks/tasks.module';
import AppController from './app.controller';

@Module({
  imports: [DbModule, UsersModule, AuthModule, TokensModule, TasksModule],
  controllers: [AppController]
})
export class AppModule {}
