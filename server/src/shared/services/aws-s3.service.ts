import { parse } from 'path';
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import { GeneratorService } from './generator.service';
import { ConfigService } from '../../shared/services/config.service';
import { IAwsConfig } from '@providers/configuration';

interface IFile {
  encoding: string;
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

@Injectable()
export class AwsS3Service {
  private readonly _s3: AWS.S3;
  private _awsConfig: IAwsConfig;

  constructor(
    public generatorService: GeneratorService,
    public configService: ConfigService,
  ) {
    this._awsConfig = this.configService.awsConfig;
    const { credential, region } = this._awsConfig;

    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: '2010-12-01',
      region: region,
    };

    if (credential.accessKey && credential.secretAccessKey) {
      options.credentials = {
        accessKeyId: credential.accessKey,
        secretAccessKey: credential.secretAccessKey,
      };
    }

    this._s3 = new AWS.S3(options);
  }

  async upload(file: IFile, storage: string, fileName?: string): Promise<string> {
    let fName = this.generatorService.fileName(<string>mime.extension(file.mimetype));

    if (fileName) {
      fName = fileName;
    }

    const key = `${storage}/${fName}`;

    await this._s3
      .upload({
        Bucket: this._awsConfig.s3.bucketName,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
        ContentType: file.mimetype,
      })
      .promise();

    return key;
  }

  async getSignedUrl(
    payload: {
      filename: string;
      filetype: string;
      subPath: string;
    },
    userId: string,
  ): Promise<any> {
    try {
      const { s3, region } = this._awsConfig;
      const { filename, filetype, subPath } = payload;
      const date = Date.now();
      const signedUrlExpireSeconds = 60 * 60;
      const myBucket = s3.bucketName;
      const { ext, name } = parse(filename);
      const key = `${subPath}/${userId}/${name}-${date}${ext}`;

      const url = await this._s3.getSignedUrlPromise('putObject', {
        Bucket: myBucket,
        Key: key,
        ContentType: filetype,
        Expires: signedUrlExpireSeconds,
      });

      return {
        url,
        pipeFrom: `https://${myBucket}.s3-${region}.amazonaws.com/${key}`,
        filePath: key,
      };
    } catch (e) {
      throw new ForbiddenException({
        message: 'Pre-signed URL error',
        url: '',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
  }

  /**
   * Get Signed URL for file existing in S3 bucket
   * @param payload
   */
  async getSignedUrlForDownload(key: string, bucket: string): Promise<any> {
    try {
      const signedUrlExpireSeconds = 60 * 60;
      const url = await this._s3.getSignedUrlPromise('getObject', {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
      });

      return url;
    } catch (e) {
      throw new ForbiddenException({
        message: 'Pre-signed URL error',
        url: '',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
  }
}
