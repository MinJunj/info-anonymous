import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'InfoPrivate',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username} = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}