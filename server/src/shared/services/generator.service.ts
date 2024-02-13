import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

const alphaNumeric = '23456789abcdefghjkmnpqrstuvwxyz'.split('');
const alphaNumericUppercase = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'.split('');
const numericCharacters = '123456789'.split('');

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }

  generateForCustomCharacters(length: number, characters: string[]): string {
    const characterCount = characters.length;
    const maxValidSelector = Math.floor(0x10000 / characterCount) * characterCount - 1;
    const entropyLength = 2 * Math.ceil(1.1 * length);
    let str = '';
    let stringLength = 0;

    while (stringLength < length) {
      const entropy = crypto.randomBytes(entropyLength);
      let entropyPosition = 0;

      while (entropyPosition < entropyLength && stringLength < length) {
        const entropyValue = entropy.readUInt16LE(entropyPosition);

        entropyPosition += 2;

        if (entropyValue > maxValidSelector) {
          continue;
        }

        str += characters[entropyValue % characterCount];
        stringLength++;
      }

      return str;
    }
  }

  /**
   * Generate ID by length
   * @param length length of ID
   * @param withUppercase If true, ID will be generated with uppercase alpha and numeric characters, else lowercase alpha
   * @returns ID as string
   */
  public generateUidByLength(length: number, withUppercase = false): string {
    const listCharacters = withUppercase ? alphaNumericUppercase : alphaNumeric;

    return this.generateForCustomCharacters(length, listCharacters);
  }

  /**
   * Generate Kit serial number (xxxx-xxxx-xxxx)
   */
  public generateString16(prefix?: string): string {
    const part1 = this.generateUidByLength(4);
    const part2 = this.generateUidByLength(4);
    const part3 = this.generateUidByLength(4);

    return `${prefix || part1}-${part2}-${part3}`;
  }

  generateString4(): string {
    const str = this.generateUidByLength(4);
    const firstCharacter = str.split('')[0];

    if (!isNaN(+firstCharacter)) {
      return this.generateString4();
    }

    return str;
  }

  public generateAnalysisString16(prefix?: string): string {
    const part1 = this.generateString4();
    const part2 = this.generateUidByLength(4);
    const part3 = this.generateUidByLength(4);
    const part4 = this.generateUidByLength(4);

    return `${prefix || part1}${part2}${part3}${part4}`;
  }

  public generateNumericPassword(length: number): string {
    return this.generateForCustomCharacters(length, numericCharacters);
  }

  public generateFriendlyIdByPrefix(length: number, prefix = ''): string {
    const generatedStr = this.generateForCustomCharacters(length, alphaNumericUppercase);

    return `${prefix}${generatedStr}`;
  }

  /**
   * Generate friendly ID (XXXX-XXXX-XXXX)
   */
  public generateFriendlyId(): string {
    const part1 = this.generateUidByLength(4, true);
    const part2 = this.generateUidByLength(4, true);
    const part3 = this.generateUidByLength(4, true);

    return `${part1}-${part2}-${part3}`;
  }

  public generateHumanReadableID(): string {
    return this.generateUidByLength(17, true);
  }
}
