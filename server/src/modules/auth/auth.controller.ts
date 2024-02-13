import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserRetakeTokenDto, UserTokenResponseDto } from './dto/UserLoginDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RfAuthGuard } from './guards/refresh_token.guard';
import { ContextService } from '@providers/context.service';
import { Public } from '@decorators/public.decorator';
import { RequestInfoInterceptor } from '@interceptors/request-info-interceptor.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @Public()
  async signUp(@Body() payload: UserRegisterDto): Promise<HttpStatus> {
    return this.authService.createUser(payload);
  }

  @Post('/sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(RequestInfoInterceptor)
  async signIn(): Promise<UserTokenResponseDto> {
    const userID = ContextService.getAuthUser();
    const roleId = ContextService.getRoleId();
    return this.authService.createResponseSignIn(roleId, userID);
  }

  @Post('/get-new-token')
  @Public()
  @UseGuards(RfAuthGuard)
  async getNewAccessToken(): Promise<UserRetakeTokenDto> {
    const userID = ContextService.getAuthUser();
    return this.authService.newAccessToken(userID);
  }
}
