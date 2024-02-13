/* eslint-disable no-console */
import times from 'lodash/times';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { DateFormat } from './enums';
dayjs.extend(utc);

export const parseFromJson: any = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('\n ==> ERROR [parseFromJson]:', e.message, '\n');
    return str;
  }
};

export function roundDecimalPrecision(number: number, fractionDigits: number): number {
  return parseFloat(number.toFixed(fractionDigits));
}

export function formatNumber(
  number: number,
  isCurrency = true,
  locale = 'en-US',
  currency = 'SGD',
): string {
  const options = { currency, style: 'currency' };

  if (!isCurrency) {
    Object.assign(options, { style: 'decimal' });
  }

  return new Intl.NumberFormat(locale, options).format(number);
}

export const applyMixins = (baseClass: any, extendedClasses: any[]) => {
  extendedClasses.forEach((extendedClass) => {
    Object.getOwnPropertyNames(extendedClass.prototype).forEach((name) => {
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) ||
          Object.create(null),
      );
    });
  });
};

export const stringifyAnObject: any = (str: any) => {
  try {
    return JSON.stringify(str);
  } catch (e) {
    console.log('🚀 ~ file: utils.ts:49 ~ e:', e);
    return 'Unexpected Error';
  }
};

export const generateKeyByCount = (count) => {
  let id = '';

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  times(count, () => {
    id += s4();
  });

  return id;
};

/**
 * @default utc = true
 * @default format = "YYYY-MM-DDTHH:mm:ss.sssZ"
 *
 * @returns Date string format
 */
export const getDateFormat = ({
  date,
  format = DateFormat.ISO_STRING,
  isUtc = false,
}: {
  date?: dayjs.Dayjs;
  format?: DateFormat;
  isUtc?: boolean;
}) => {
  return isUtc ? dayjs(date).utc().format(format) : dayjs(date).format(format);
};
