/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { createCipheriv, createHash, randomBytes, createDecipheriv } from 'crypto';
import * as dotenv from 'dotenv';
import configuration from './configuration';

export class UtilsService {
  static config = configuration();

  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */

  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * generate random string
   * @param length
   */
  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .substr(0, length);
  }
  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  static timeout(ms: number): Promise<NodeJS.Timeout> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static encryptData = (data: string) => {
    const key = createHash('sha256')
      .update(String(this.config.jwtConfig.key_er))
      .digest('base64')
      .substring(0, 32);
    const cipher = createCipheriv(
      this.config.jwtConfig.alg,
      key,
      this.config.jwtConfig.iv,
    );

    const result = `${cipher.update(data, 'utf-8', 'hex')}${cipher.final('hex')}`;

    return result;
  };

  static decryptData = (data: string) => {
    const key = createHash('sha256')
      .update(String(this.config.jwtConfig.key_er))
      .digest('base64')
      .substring(0, 32);

    const decipher = createDecipheriv(
      this.config.jwtConfig.alg,
      key,
      this.config.jwtConfig.iv,
    );
    const result = `${decipher.update(data, 'hex', 'utf-8')}${decipher.final('utf-8')}`;

    return result;
  };
}
