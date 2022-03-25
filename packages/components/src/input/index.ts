import * as React from 'react';
import { make } from './MxRC__Input.gen';
import type { Props, InputRef } from './MxRC__Input.gen';
import { make as Search } from './MxRC__Input__Search.gen';
import type { Props as SeProps } from './MxRC__Input__Search.gen';

// 2022-03-25 23:53:20 rescript onchange is ReactEvent.Form.t
interface InputProps extends Omit<Props, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface SearchProps extends Omit<SeProps, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

type SearchComponent = React.FunctionComponent<SearchProps>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Search: SearchComponent;
}

const Input: CompoundedComponent = make as CompoundedComponent;
Input.Search = Search as SearchComponent;

export { Input };
export type { InputProps, SearchProps };
