import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './boards/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule
  ],
})
export class AppModule {}
