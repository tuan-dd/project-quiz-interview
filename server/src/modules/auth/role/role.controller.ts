import { Controller, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RoleDto } from '../dto/RoleDto';
import { RolesGuard } from '@auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(protected _roleService: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all roles successfully',
    type: [RoleDto],
  })
  getRoles(): Promise<RoleEntity[]> {
    return this._roleService.getAllRole();
  }
}
