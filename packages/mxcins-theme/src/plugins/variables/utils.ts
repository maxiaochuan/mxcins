export const SELECTOR = 'VARIABLE_OUTPUT_PLUGIN';

export const generateSelector = (selector: any, content: any) => `${selector}{${content}}`;

export const generateRulesFromVariables = (variables: any) =>
  variables.map((variable: any) => `${variable.slice(1)}: ${variable};`);
