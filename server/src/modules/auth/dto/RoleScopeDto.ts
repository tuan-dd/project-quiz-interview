import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class RoleScopeDto extends AbstractDto {
  @ApiProperty()
  roleId: number;

  @ApiProperty()
  scopeId: number;
}
