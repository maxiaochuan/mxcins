/* eslint-disable @typescript-eslint/ban-types, no-extend-native */
import pluralize from '@mxcins/pluralize';
import { camelCase, snakeCase, kebabCase, upperFirst, lowerFirst, uniq } from 'lodash';

import './dom';

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
})();

export { pluralize };
export { default as win } from './window';
