import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard("jwt"))//Cannot read properties of undefined 에러로 state에 data값이 존재 안 해서 발생한 오류로 타입을 미리 전달.
export class BoardsController {
    constructor(private boardsService : BoardsService) {}

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id : number) : Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    

}
