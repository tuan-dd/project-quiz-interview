import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './PageMetaDto';
import { PageOptionsDto } from './PageOptionsDto';

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class CommonPagingResponse<T> extends PageMetaDto {
  @IsArray({ each: true })
  @ApiProperty()
  data: T[];

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters, data: T[]) {
    super({ pageOptionsDto, itemCount });
    this.data = data;
  }
}
