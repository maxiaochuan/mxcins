import pluralize from '@mxcins/pluralize';
import { camelCase,
  snakeCase, upperFirst, kebabCase, lowerFirst,
} from 'lodash';

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
] as [any, Function][]).forEach(([key, fn]) => {
  if (!String.prototype[key]) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(String.prototype, key, {
      get () {
        return fn(this)
      },
    })
  }
})

export { pluralize };
