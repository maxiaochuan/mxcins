/* eslint-disable no-underscore-dangle */
import { SELECTOR, generateSelector, generateRulesFromVariables } from './utils';

export default class VariablesOutputVisitor {
  public isPreEvalVisitor = true;

  public _less: any;

  public _visitor: any;

  constructor(less: any) {
    // this.isPreEvalVisitor = true;
    this._less = less;
    this._visitor = new less.visitors.Visitor(this);
  }

  run(root: any) {
    const variables = root.variables();

    // Generate a dummy selector we can output the variables as rule names
    const rules = generateRulesFromVariables(Object.keys(variables));
    const rule = generateSelector(SELECTOR, rules.join('\n'));

    // Parse the new selector into an AST...
    this._less.parse(rule, { filename: SELECTOR }, (_: any, mixinRoot: any) => {
      const r = mixinRoot.rules[0];
      root.rules.push(r);
    });

    return this._visitor.visit(root);
  }
}
