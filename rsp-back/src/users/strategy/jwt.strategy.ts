import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repository/users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthJwtStategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload) {
    const { email } = payload;

    const user = await this.userRepository.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: `Unauthorized`,
        data: null,
      });
    }

    return user;
  }
}
