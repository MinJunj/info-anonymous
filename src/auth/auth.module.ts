import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/custom-entitiy-repository/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'InfoPrivate',
      signOptions:{
        expiresIn: '1h'
      }
    })
    , 
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
