import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/custom-entitiy-repository/typeorm-ex.module';


@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]), //커스텀이고 typeorm에서 지원하지 않은거라 임포트해줘야됨
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
