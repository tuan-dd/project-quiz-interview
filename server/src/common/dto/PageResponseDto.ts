import {
  ApiProperty,
  getSchemaPath,
  ApiOkResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PageOptionsDto } from './PageOptionsDto';

interface IPageMetaDtoParameters<T> {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(PageResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );

export class PageResponseDto<T> {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty({ type: () => Array<T> })
  data: T[];

  constructor({ pageOptionsDto, itemCount, data }: IPageMetaDtoParameters<T>) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    this.data = data;
  }
}
