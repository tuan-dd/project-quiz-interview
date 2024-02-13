import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@interceptors/logging.interceptor.service';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { JwtAuthGuard } from '@auth/guards/auth.guard';
import { QuizModule } from './modules/quiz/quiz.module';
import { InfoLatestSigninModule } from './modules/user/info_latest_signin/info_latest_signin.module';
import { InfoUserModule } from './modules/user/info_user/info_user.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';
import { DataSource } from 'typeorm';
import { ConfigService } from '@shared/services/config.service';

@Module({
  imports: [
    SharedModule,
    QuizModule,
    InfoLatestSigninModule,
    InfoUserModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        await dataSource.runMigrations();
        return dataSource;
      },
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
