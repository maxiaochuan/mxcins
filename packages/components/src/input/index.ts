import * as React from 'react';
import { make } from './MxRC__Input.gen';
import type { Props, InputRef, InputType } from './MxRC__Input.gen';
import { make as Search } from './MxRC__Input__Search.gen';
import type { Props as SearchProps1 } from './MxRC__Input__Search.gen';
import { make as TextArea } from './MxRC__Input__TextArea.gen';
import type { Props as TextAreaProps1 } from './MxRC__Input__TextArea.gen';
import { make as Password } from './MxRC__Input__Password.gen';
import type { Props as PasswordProps1 } from './MxRC__Input__Password.gen';

// 2022-03-25 23:53:20 rescript onchange is ReactEvent.Form.t
interface InputProps extends Omit<Props, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface SearchProps extends Omit<SearchProps1, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface TextAreaProps extends Omit<TextAreaProps1, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

interface PasswordProps extends Omit<PasswordProps1, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

type SearchComponent = React.FunctionComponent<SearchProps>;
type TextAreaComponent = React.FunctionComponent<TextAreaProps>;
type PasswordComponent = React.FunctionComponent<PasswordProps>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Search: SearchComponent;
  TextArea: TextAreaComponent;
  Password: PasswordComponent;
}

const Input: CompoundedComponent = make as CompoundedComponent;
Input.Search = Search as SearchComponent;
Input.TextArea = TextArea as TextAreaComponent;
Input.Password = Password as PasswordComponent;

export { Input };
export type { InputType, InputProps, SearchProps, TextAreaProps, PasswordProps };
