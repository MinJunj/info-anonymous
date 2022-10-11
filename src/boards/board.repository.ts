
import { CustomRepository } from "src/custom-entitiy-repository/typeorm-ex.decorator";
import { Board } from "./board.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { User } from "src/auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto, user:User) : Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({ 
            title, 
            description,
            user
        })

        await this.save(board);
        return board;
    }
}
//데이터베이스에 연결하고 이를 편하게 쓰기위해서 레포지토리를 만듬.
