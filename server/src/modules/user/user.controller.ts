import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ContextService } from '@providers/context.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(): Promise<UserEntity> {
    return this.userService.findOne({
      where: {
        id: ContextService.getAuthUser(),
      },
      relations: {
        info: true,
        role: { scopes: true },
      },
    });
  }
}
