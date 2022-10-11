import { IsNotEmpty} from "class-validator"
export class CreateBoardDto {//데이터의 효율적인 처리를 위해 사용. 이걸로 받는 데이터 설 거름

    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;
}