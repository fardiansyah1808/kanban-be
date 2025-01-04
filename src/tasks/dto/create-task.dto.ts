import { IsNotEmpty, IsString, Length, IsAscii } from 'class-validator';

export class CreateTaskDto {
  @IsAscii()
  @Length(3, 40)
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  readonly description: string;
}
