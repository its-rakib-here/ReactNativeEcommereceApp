import { IsNotEmpty, IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserType } from '../users.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string; // Plain password before hashing

  @IsNotEmpty()
  @IsEnum(UserType)
  user_type: UserType;
}
