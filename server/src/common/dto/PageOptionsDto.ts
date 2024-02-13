import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  Max,
  Min,
} from 'class-validator';
import { Order } from '../constants/order';
import { BooleanEnum } from '../enums/boolean.enum';
import { Transform } from 'class-transformer';

export class PageOptionsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.DESC,
  })
  @IsOptional()
  @IsEnum(Order)
  readonly order: Order = Order.DESC;

  @ApiPropertyOptional({
    description: 'Min: 1',
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiPropertyOptional({
    description: 'Min: 1 - Max: 100',
    default: 30,
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  @Max(20000)
  readonly take: number = 30;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly q?: string;

  @ApiPropertyOptional({ enum: BooleanEnum })
  @IsOptional()
  @Transform(({ value }) => `${value}` === BooleanEnum.TRUE)
  @IsBoolean()
  readonly isDeleted?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  ids?: string[];

  @ApiPropertyOptional({ enum: BooleanEnum })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toString() === BooleanEnum.TRUE;
    }

    return value;
  })
  @IsBoolean()
  readonly selectAll?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderField?: string;
}
