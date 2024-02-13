import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration, {
  IAwsConfig,
  IConfig,
  IS3Config,
  IBasicAuth,
  ICloudWatch,
} from '@providers/configuration';
import { SnakeNamingStrategy } from '../snake-naming.strategy';
import { DatabaseLogger } from '@shared/logger/database.logger';

export class ConfigService {
  privateConfig: IConfig = configuration();

  get config(): IConfig {
    return this.privateConfig;
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isStaging(): boolean {
    return this.nodeEnv === 'staging';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get nodeEnv(): string {
    return this.config.nodeEnv;
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    const options: TypeOrmModuleOptions = {
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host: this.config.db.host,
      port: this.config.db.port,
      username: this.config.db.username,
      password: this.config.db.password,
      database: this.config.db.database,
      migrationsRun: false,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: false,
      logger: new DatabaseLogger(),
    };

    return options;
  }

  get awsConfig(): IAwsConfig {
    return this.config.awsConfig;
  }

  get awsS3Config(): IS3Config {
    return this.config.awsConfig.s3;
  }

  get awsSenderEmail(): string {
    return this.config.awsConfig.ses.sender;
  }

  get sesRegion(): string {
    return this.config.awsConfig.ses.region;
  }

  get appDomain(): string {
    return this.config.app.domain;
  }

  get appProtocol(): string {
    return this.config.app.protocol;
  }

  // get mailgunConfig(): IMailgunConfig {
  //   return this.config.mailgunConfig;
  // }

  get basicAuthConfig(): IBasicAuth {
    return this.config.basicAuth;
  }

  get cloudwatch(): ICloudWatch {
    return this.config.awsConfig.cloudWatch;
  }

  get domainServer(): string {
    return this.config.domainServer;
  }
}
