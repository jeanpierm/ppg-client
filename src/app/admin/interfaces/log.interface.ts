export interface Log {
  logId: string;
  level: string;
  timestamp: string;
  statusCode: number;
  message: string;
  httpMethod: string;
  path: string;
  methodKey: string;
  className: string;
  ip: string;
  hostname: string;
  userId: string;
  applicationName: string;
}
