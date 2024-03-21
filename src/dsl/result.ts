export type Result<TData> = Success<TData> | Failure;

export interface Success<TData> {
  readonly success: true;
  readonly data: TData;
}

export interface Failure {
  readonly success: false;
  readonly reason: string;
  readonly position: Position | undefined;
}

export interface Position {
  readonly index: number;
  readonly line: number;
  readonly column: number;
}

export function success<TData>(data: TData): Success<TData> {
  return { data, success: true };
}

export function failure(reason: string, position?: Position): Failure {
  return { position, reason, success: false };
}
