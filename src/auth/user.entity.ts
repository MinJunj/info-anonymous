import { Board } from "src/boards/board.entity";
import { Unique, BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
//@Unique(['username']) sql INSERT오류나서 따로 빼둠.
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Board, board => board.user, { eager : true}) //boards.entity와 연동
    boards: Board[];

}