import { SELECTOR } from './utils';

export default class VariablesOutputPreProcessor {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor(_: any) {}

  // eslint-disable-next-line class-methods-use-this
  process(src: any, { imports }: any) {
    // Required for sourcemaps to work correctly, since the injected AST nodes
    // in `visitor.js` are from an import outside of the root context. We simply
    // inject a dummy string as the file content for the simulated filename of
    // the root level node in `less.render` call in `visitor.js`
    imports.contents[SELECTOR] = '';

    return src;
  }
}
