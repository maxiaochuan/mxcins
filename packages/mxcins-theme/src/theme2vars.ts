import { palette } from './utils';

const generateColors = (colors: Record<string, string>) =>
  Object.keys(colors).reduce<Record<string, string>>((prev, key) => {
    prev[key] = colors[key];
    const name = key.split('-')[0];
    if (name) {
      prev[name] = colors[key];
      Array.from(Array(10), (_, i) => i + 1).forEach(index => {
        prev[`${name}-${index}`] = index === 6 ? colors[key] : palette(colors[key], index);
      });
    }

    return prev;
  }, {});

export default (theme: Record<string, Record<string, any>>) => {
  return Object.keys(theme).reduce<Record<string, Record<string, any>>>((prev, key) => {
    const { colors: themeColors, ...rest } = theme[key];
    const colors = generateColors(themeColors);
    const merged: Record<string, string> = { ...colors, ...rest };
    prev[key] = Object.keys(merged).reduce<Record<string, string>>((pre, k) => {
      pre[k] = (merged[k] && merged[k].startsWith('~') && merged[merged[k].slice(1)]) || merged[k];
      return pre;
    }, {});
    return prev;
  }, {});
};
