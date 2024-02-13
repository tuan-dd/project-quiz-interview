export type TTypeLogger =
  | 'Func error'
  | 'Database error'
  | 'Module error'
  | 'Unknown'
  | 'Client error'
  | 'Logger';

export interface ILogger {
  type: TTypeLogger;
  context: string;
  stack: any;
}
