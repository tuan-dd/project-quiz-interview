import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class UserLoginDto {
  @IsNumberString()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}

export class UserTokenResponseDto {
  @ApiProperty()
  AccessToken: string;

  @ApiProperty()
  ExpiresIn: number;

  @ApiProperty()
  RefreshToken: string;
}

export class UserRetakeTokenDto {
  @ApiProperty()
  AccessToken: string;

  @ApiProperty()
  ExpiresIn: number;
}
