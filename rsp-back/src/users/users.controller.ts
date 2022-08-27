import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth-dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: UserAuthDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() loginUserDto: UserAuthDto) {
    return this.usersService.signIn(loginUserDto);
  }
}
