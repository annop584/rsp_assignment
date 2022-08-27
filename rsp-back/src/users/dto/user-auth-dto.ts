import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class UserAuthDto {
  @IsEmail()
  @MinLength(4)
  // @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(4, { message: 'password must > 4' })
  @MaxLength(20, { message: 'password must <= 20' })
  password: string;
}
