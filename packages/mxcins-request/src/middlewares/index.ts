import fetch from './fetch';
import get from './get';
import post from './post';
import parse from './parse';

export { parse, fetch, get, post };

export const builtins = [post, get, fetch, parse];
