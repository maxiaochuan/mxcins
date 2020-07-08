import Visitor from './visitor';
import PostProcessor from './postProcessor';
import PreProcessor from './preProcessor';

export default class VariablesOutputPlugin {
  public options: any = {};

  public minVersion = [2, 0, 0];

  constructor(options: any) {
    this.options = { ...options };
  }

  install(less: any, pluginManager: any) {
    const { filename } = this.options;

    pluginManager.addPreProcessor(new PreProcessor(less));
    pluginManager.addVisitor(new Visitor(less));
    pluginManager.addPostProcessor(new PostProcessor(less, filename));
  }

  setOptions(filename: string) {
    this.options.filename = filename;
  }

  // eslint-disable-next-line class-methods-use-this
  printUsage() {
    return '--variables-output=filename.json';
  }
}
