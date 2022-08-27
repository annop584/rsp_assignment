import { Module } from '@nestjs/common';
import { RspController } from './rsp.controller';
import { RspService } from './rsp.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/repository/users.repository';
import { Highscore } from './entities/highscore.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { HighscoreRepository } from './repository/highscore.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: 1000 * 60 * 60 * 24 * 30 },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository, HighscoreRepository, Highscore]),
  ],
  controllers: [RspController, UsersController],
  providers: [RspService, UsersService],
})
export class RspModule {}
