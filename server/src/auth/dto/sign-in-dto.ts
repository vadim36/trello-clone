import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import CreateUserDto from "src/users/dto/create-user-dto";

export default class SigninDto implements Partial<CreateUserDto> {
  @ApiProperty({description: 'an email', example: 'test@gmail.com'})
  @IsString({message: 'email must be a string'})
  @IsEmail({}, {message: 'email must be correct'})
  email: string;
  @ApiProperty({description: 'a password', example: 'test123'})
  @IsString({message: 'password must be a string'})
  @Length(3, 24, {message: 'password must be longer than 3 and less and 24'})
  password: string;
}