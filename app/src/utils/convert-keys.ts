/* eslint-disable @typescript-eslint/no-explicit-any */
import camelCase from 'lodash/camelCase';
import forOwn from 'lodash/forOwn';
import isPlainObject from 'lodash/isPlainObject';
import snakeCase from 'lodash/snakeCase';

type TransformFn = (key: string | undefined) => string;

// This type definitions are used so that Typescript shows the expected
// return values of toSnake and toCamel functions correctly
type SnakeToCamelCase<S extends string | number | symbol> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

type CamelToSnakeCase<S extends string | number | symbol> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? '_'
        : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

type SnakeToCamelCaseNested<T> = T extends Array<infer U>
  ? Array<SnakeToCamelCaseNested<U>>
  : T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<string & K>]: SnakeToCamelCaseNested<
        T[K]
      >;
    }
  : T;
type CamelToSnakeCaseNested<T> = T extends Array<infer U>
  ? Array<CamelToSnakeCaseNested<U>>
  : T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<string & K>]: CamelToSnakeCaseNested<
        T[K]
      >;
    }
  : T;

const traverse = (object: any, transform: TransformFn): any => {
  const structure: any = Array.isArray(object) ? [] : {};

  forOwn(object, (value: any, key: string) => {
    let newValue = value;
    if (isPlainObject(value) || Array.isArray(value)) {
      newValue = traverse(value, transform);
    }
    structure[transform(key)] = newValue;
  });

  return structure;
};

export const toCamel = <T>(object: T): SnakeToCamelCaseNested<T> =>
  traverse(object, (key: string | undefined) => camelCase(key));

export const toSnake = <T>(object: T): CamelToSnakeCaseNested<T> =>
  traverse(object, (key: string | undefined) => snakeCase(key));
