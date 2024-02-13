import { Type } from '@nestjs/common';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export function Paginated<T>(_classRef: Type<T>): Type<IPaginatedType<T>> {
  abstract class EdgeType {
    cursor: string;

    node: T;
  }

  abstract class PaginatedType implements IPaginatedType<T> {
    edges: EdgeType[];

    nodes: T[];

    totalCount: number;

    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
