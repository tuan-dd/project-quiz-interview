import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AwsS3Service } from './services/aws-s3.service';
import { ConfigService } from './services/config.service';
import { ValidatorService } from './services/validator.service';
import { GeneratorService } from './services/generator.service';
import { GeneralLogger } from './services/logger-general.service';
import { HttpModule } from '@nestjs/axios';
// import { MailgunService } from './services/mailgun.service';
import { PassportModule } from '@nestjs/passport';

const providers = [
  ConfigService,
  ValidatorService,
  AwsS3Service,
  GeneratorService,
  GeneralLogger,
  PassportModule,
  // MailgunService,
];

@Global()
@Module({
  providers,
  imports: [
    PassportModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.config.jwtConfig.key_at,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
