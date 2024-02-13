import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// import {
//   alphabetErrorMessage,
//   alphabetRegex,
// } from '../../../common/constants/regexes';

export class UserRegisterDto {
  @ApiPropertyOptional({ example: 'firstName' })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123456789' })
  @IsNumberString()
  @MinLength(4)
  phone: string;

  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({ minLength: 6 })
  password: string;

  @ApiPropertyOptional({ example: 'Avatar url' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ example: '+65' })
  @IsOptional()
  @IsString()
  phonePrefix?: string;
}
