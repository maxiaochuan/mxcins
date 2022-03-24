import { make } from './MxRC__Input.gen';
import type { Props as InputProps } from './MxRC__Input.gen';
import { make as Search } from './MxRC__Input__Search.gen'
import type { Props as SearchProps } from './MxRC__Input__Search.gen'

const Input: typeof make & { Search: typeof Search } = make as any
Input.Search = Search;

export { Input };
export type { InputProps, SearchProps };
