import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import * as dayjs from 'dayjs';

import configuration, { IAwsConfig, IConfig } from '@providers/configuration';
import { DateFormat } from '@common/enums/date-format.enum';

@Injectable()
export class GeneralLogger implements LoggerService {
  private _logger: winston.Logger;
  private _allConfig: IConfig = configuration();
  private _config: IAwsConfig = this._allConfig.awsConfig;

  constructor() {
    this.initializeLogger();
  }

  initializeLogger(): void {
    const { format, config, createLogger } = winston;
    const { printf, colorize } = format;
    const colorizer = colorize();

    // Format: <LABEL> - <DD/MM/YYYY HH:mm:ss>     <LEVEL>: "<message>" - "<user agent>"
    const formatLog = (
      label: string,
      startAt: string,
      level: string,
      message: string,
    ) => {
      const dateTime = dayjs(startAt).format(DateFormat.FULL_DATE_TIME);
      return `${label} - ${dateTime}     ${level.toUpperCase()}: ${message}`;
    };

    const formatConsoleLog = (
      label: string,
      startAt: string,
      level: string,
      message: string,
    ) => {
      const dateTime = dayjs(startAt).format(DateFormat.FULL_DATE_TIME);
      const labelColorized = colorizer.colorize(level, label);
      const levelColorized = colorizer.colorize(level, level.toUpperCase());
      const msgColorized = colorizer.colorize('lightGrey', message);

      return `${labelColorized} - ${dateTime}     ${levelColorized}: ${msgColorized}`;
    };

    const customFormat = printf(({ timestamp, level, message, label }) => {
      return formatLog(label, timestamp, level, message);
    });
    const customConsoleFormat = printf(({ timestamp, level, message, label }) => {
      return formatConsoleLog(label, timestamp, level, message);
    });
    const { combine, timestamp } = format;

    const customLevel = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        lightGrey: 7,
      },
      colors: {
        error: 'bold red',
        warn: 'bold yellow',
        info: 'bold cyan',
        http: 'bold green',
        verbose: 'bold green',
        debug: 'bold gray',
        silly: 'bold pink',
        lightGrey: 'gray',
      },
    };

    config.addColors(customLevel.colors);

    this._logger = createLogger({
      levels: customLevel.levels,
      format: combine(
        format.label({
          label: '[LOGGER]',
        }),
        timestamp({ format: DateFormat.FULL_DATE_TIME }),
        customFormat,
      ),
      transports: [
        new winston.transports.Console({
          format: combine(
            format.label({
              label: '[LOGGER]',
            }),
            timestamp({
              format: DateFormat.FULL_DATE_TIME,
            }),
            customConsoleFormat,
          ),
        }),
      ],
    });

    const { cloudWatch, credential, region } = this._config;
    const { accessKey, secretAccessKey } = credential;

    if (cloudWatch.logGroupName && cloudWatch.logStreamGeneral) {
      const winstonConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
        logGroupName: cloudWatch.logGroupName,
        logStreamName: cloudWatch.logStreamGeneral,
        messageFormatter: ({ level, message }) => `[${level}]: ${message}`,
        awsRegion: region,
      };

      if (accessKey && secretAccessKey) {
        winstonConfig.awsOptions = {
          credentials: {
            accessKeyId: accessKey,
            secretAccessKey,
          },
        };
      }

      this._logger.add(new WinstonCloudWatch(winstonConfig));
    }

    // this._logger.add(new WinstonCloudWatch(winstonConfig));
    return;
  }

  log(message: string): void {
    this._logger.log('info', message);
  }

  error(message: string): void {
    this._logger.log('error', message);
  }

  warn(message: string): void {
    this._logger.log('warn', message);
  }

  debug(message: string): void {
    this._logger.log('debug', message);
  }

  verbose(message: string): void {
    this._logger.log('debug', message);
  }

  http(message: string): void {
    this._logger.http('http', message);
  }
}
