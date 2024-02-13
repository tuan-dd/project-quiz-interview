import * as dotenv from 'dotenv';

if (['development', 'test'].includes(process.env.NODE_ENV)) {
  dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
  });
}

export interface IJwtConfig {
  key_at: string;
  key_rt: string;
  expirationTime: number;
  alg: string;
  key_er: string;
  iv: string;
}

export interface IDbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IS3Config {
  bucketName: string;
}

export interface ISesConfig {
  sender: string;
  region: string;
}

export interface IAthena {
  database: string;
  region: string;
  outputLocation: string;
}

export type IProtocol = 'http' | 'https';

export interface IApp {
  domain: string;
  protocol: IProtocol;
}

export interface ICloudWatch {
  logGroupName: string;
  logStreamGeneral: string;
}

export interface IAwsConfig {
  credential: {
    accessKey: string;
    secretAccessKey: string;
  };
  region: string;
  s3: IS3Config;
  ses: ISesConfig;
  athena: IAthena;
  cloudWatch: ICloudWatch;
}

export interface IBasicAuth {
  basicUsername: string;
  basicPassword: string;
}

export interface IConfig {
  nodeEnv: string;
  port: number;
  jwtConfig: IJwtConfig;
  app: IApp;
  db: IDbConfig;
  awsConfig: IAwsConfig;
  basicAuth: IBasicAuth;
  domainServer: string;
}

export default function configuration(): IConfig {
  const configs = {
    nodeEnv: process.env.NODE_ENV,
    port: Number.parseInt(process.env.PORT, 10),
    jwtConfig: {
      key_at: process.env.AT_SECRET_KEY,
      key_rt: process.env.RF_SECRET_KEY,
      expirationTime: Number.parseInt(process.env.JWT_EXPIRATION_TIME, 10),
      alg: process.env.ALGORITHM ?? 'aes-256-cbc',
      key_er: process.env.SECRET_KEY_ER,
      iv: process.env.SECRET_KEY_IV,
    },
    app: {
      protocol: process.env.APP_PROTOCOL as IProtocol,
      domain: process.env.APP_DOMAIN,
    },
    db: {
      host: process.env.RDS_HOSTNAME,
      port: Number.parseInt(process.env.RDS_PORT, 10),
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
    },
    awsConfig: {
      s3: {
        bucketName: process.env.S3_BUCKET_NAME,
      },
      credential: {
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      ses: {
        sender: process.env.SES_SENDER,
        region: process.env.SES_REGION,
      },
      cloudWatch: {
        logStreamGeneral: process.env.AWS_LOG_STREAM_NAME,
        logGroupName: process.env.AWS_LOG_GROUP_NAME,
      },
      athena: {
        region: process.env.ATHENA_REGION,
        outputLocation: process.env.ATHENA_OUTPUT_LOCATION,
        database: process.env.ATHENA_DATABASE,
      },
      region: process.env.REGION,
    },
    basicAuth: {
      basicUsername: process.env.BASIC_USERNAME,
      basicPassword: process.env.BASIC_PASSWORD,
    },
    domainServer: process.env.DOMAIN_SERVER,
  };

  return configs;
}
