import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/AbstractDto';

export class ScopeDto extends AbstractDto {
  @ApiPropertyOptional()
  action: string;

  @ApiPropertyOptional()
  entity: string;
}
