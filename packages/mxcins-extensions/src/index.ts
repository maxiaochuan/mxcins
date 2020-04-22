import pluralize from '@mxcins/pluralize';
import { camelCase, snakeCase, upperFirst, kebabCase, lowerFirst } from 'lodash';

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
}

([
  ['pascalcase', (str: string) => upperFirst(camelCase(str))],
  ['camelcase', camelCase],
  ['snakecase', snakeCase],
  ['kebabcase', kebabCase],
  ['pluralize', pluralize.plural],
  ['singularize', pluralize.singular],
  ['isPlural', pluralize.isPlural],
  ['isSingular', pluralize.isSingular],
  ['upperFirst', upperFirst],
  ['lowerFirst', lowerFirst],
] as [keyof string, Function][]).forEach(([key, fn]) => {
  if (String && typeof String.prototype[key] === 'undefined') {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(String.prototype, key, {
      get() {
        return fn(this);
      },
    });
  }
});

// eslint-disable-next-line import/prefer-default-export
export { pluralize };
