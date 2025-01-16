import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSaltSync(10);
    const newUser = this.userRepository.create();

    const hashedPassword = await bcrypt.hash(
      createUserDto.passwordConfirmation,
      salt,
    );

    newUser.name = createUserDto.name;
    newUser.username = createUserDto.username.toLowerCase();
    newUser.email = createUserDto.email.toLowerCase();
    newUser.isDeleted = false;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.passwordHash = hashedPassword;

    const userCreated = await this.userRepository.save(newUser);

    return new CreateUserDto(
      userCreated.name,
      userCreated.username,
      userCreated.email,
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
