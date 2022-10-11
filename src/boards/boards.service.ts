import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: any): Promise<Board> {
        const found = await this.boardRepository.findOneBy(id); //공식문서 왈// 버전 다운그레이드 하셈

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id:number): Promise<void> {
        const result = await this.boardRepository.delete(id);//getBoardById에서 findOne일 떄는 버그 있었는데 findOneBy로 바꾸니까 됨

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

}
