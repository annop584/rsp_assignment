import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repository/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthDto } from './dto/user-auth-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: UserAuthDto) {
    const checkMailRepeat = await this.userRepository.isAlreadyhasEmail(
      createUserDto.email,
    );

    if (checkMailRepeat) {
      throw new ConflictException({
        success: false,
        message: 'Error, because this email already exist!',
        data: null,
      });
    }

    const user = await this.userRepository.createUser(createUserDto);
    const payload = {
      email: user.email,
    };

    const token = await this.jwtService.sign(payload);
    return {
      success: true,
      message: 'User information',
      data: {
        token: token,
        score: user.score,
        email: user.email,
      },
    };
  }

  async signIn(loginDto: UserAuthDto) {
    const user = await this.userRepository.verifyUserPassword(loginDto);
    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid username or password',
        data: null,
      });
    }

    const payload = {
      email: user.email,
    };
    const token = await this.jwtService.sign(payload);
    return {
      success: true,
      message: 'User information',
      data: {
        token: token,
        score: user.score,
        email: user.email,
      },
    };
  }
}
