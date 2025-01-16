import {
  IsAscii,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsAscii()
  @MinLength(3)
  @MaxLength(128)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  passwordConfirmation: string;

  constructor(name: string, username: string, email: string) {
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
