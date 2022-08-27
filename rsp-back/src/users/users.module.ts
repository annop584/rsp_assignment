import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserRepository } from './repository/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthJwtStategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: 1000 * 60 * 60 * 24 * 30 },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository, User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthJwtStategy],
  exports: [AuthJwtStategy, PassportModule],
})
export class UsersModule {}
