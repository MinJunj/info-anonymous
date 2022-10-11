import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService : JwtService //내가 가져온 모듈이니까 쓰려면 인젝트해줘야함니다.
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}> {
        const { username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))) {

            //user token issue ( Secret + Payload )
            const patload = {username};
            const accessToken = await this.jwtService.sign(patload);
            console.log('logIn success');
            return {accessToken};
        } else {
            throw new UnauthorizedException('logIn failed');
        }
        
    }
}
