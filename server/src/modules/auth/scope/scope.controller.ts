import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '@auth/guards/roles.guard';
// import { ScopeService } from 'modules/auth/scope/scope.service';
// import { ScopeResponseDto } from 'modules/auth/dto';
import { EntityEnum } from '@common/enums';
import { ScopeEntity } from './scope.entity';
import { ScopeService } from './scope.service';

@ApiBearerAuth()
@ApiTags(EntityEnum.SCOPE.toUpperCase())
@Controller(EntityEnum.SCOPE)
@UseGuards(RolesGuard)
export class ScopeController {
  constructor(private scopeService: ScopeService) {}

  // # ====================== #
  // # ==> GET ALL SCOPES <== #
  // # ====================== #
  @Get()
  @ApiOperation({ summary: 'Get all scopes' })
  // @ApiOkResponse({
  //   description: 'Get all scopes successfully',
  //   type: [ScopeResponseDto],
  // })
  getScopes(): Promise<ScopeEntity[]> {
    return this.scopeService.repository.find();
  }
}
