import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserCreatedDto extends OmitType(CreateUserDto, [
  'password',
  'passwordConfirmation',
]) {
  constructor(name: string, username: string, email: string) {
    super(name, username, email);
  }
}
