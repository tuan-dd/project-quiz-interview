import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class RoleDto extends AbstractDto {
  @ApiPropertyOptional()
  name: string;
}
