/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-types, no-extend-native */
import pluralize from '@mxcins/pluralize';
import { camelCase, snakeCase, kebabCase, upperFirst, lowerFirst, uniq } from 'lodash';

import './dom';

export declare type InternalNamePath = (string | number)[];
export declare type NamePath = string | number | InternalNamePath;

declare global {
  interface String {
    pascalcase: string;
    camelcase: string;
    snakecase: string;
    kebabcase: string;
    pluralize: string;
    singularize: string;
    isPlural: boolean;
    isSingular: boolean;
    upperFirst: string;
    lowerFirst: string;
  }
  interface Object {
    _setv: <T extends Record<string, any>>(property: NamePath, value: any) => T;
    _getv: (property: NamePath) => string;
  }
  interface Array<T> {
    uniq: T[];
  }
}

(() => {
  const funcs: [keyof string, (str: string) => string | boolean][] = [
    ['pascalcase', str => upperFirst(camelCase(str))],
    ['camelcase', camelCase],
    ['snakecase', snakeCase],
    ['kebabcase', kebabCase],
    ['pluralize', pluralize.plural],
    ['singularize', pluralize.singular],
    ['isPlural', pluralize.isPlural],
    ['isSingular', pluralize.isSingular],
    ['upperFirst', upperFirst],
    ['lowerFirst', lowerFirst],
  ];

  funcs.forEach(([key, fn]) => {
    if (String && typeof String.prototype[key] === 'undefined') {
      Object.defineProperty(String.prototype, key, {
        get() {
          return fn(this);
        },
      });
    }
  });

  if (Array && typeof Array.prototype.uniq === 'undefined') {
    Object.defineProperty(Array.prototype, 'uniq', {
      get() {
        return uniq(this);
      },
    });
  }
  if (typeof Object.prototype._setv === 'undefined') {
    Object.defineProperty(Object.prototype, '_setv', {
      configurable: false,
      writable: false,
      enumerable: false,
      value: function setv(name: NamePath, v: any) {
        const names = Array.isArray(name) ? [...name] : [name];
        const fn = (target: Record<string, any>): any => {
          const key = names.shift()!;
          target[key] = names.length
            ? fn(target[key] || (typeof names[0] === 'number' ? [] : {}))
            : v;
          return target;
        };

        return fn(this);
      },
    });
  }

  if (typeof Object.prototype._getv === 'undefined') {
    Object.defineProperty(Object.prototype, '_getv', {
      configurable: false,
      writable: false,
      enumerable: false,
      value: function getv(name: NamePath) {
        const names = Array.isArray(name) ? [...name] : [name];
        const key = names.shift()!;
        if (names.length) {
          if (this[key] && this[key]._getv) {
            return this[key]._getv(names);
          }
          // eslint-disable-next-line unicorn/no-useless-undefined
          return undefined;
        }
        return this[key];
      },
    });
  }
})();

export { pluralize };
export { default as win } from './window';
