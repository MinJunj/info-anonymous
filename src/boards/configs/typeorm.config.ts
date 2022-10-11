import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Board } from "../board.entity";

export const typeORMConfig : TypeOrmModuleOptions = {

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'info',
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: [User, Board],
    synchronize: true,
}