import { ComponentType } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { make } from './MxRC__Form.gen';
import type { Props } from './MxRC__Form.gen';
import { make as FormField } from './MxRC__FormField.gen';
import type { Props as FormFieldProps } from './MxRC__FormField.gen';
import { make as GenFormText } from './MxRC__FormText.gen';
import type { Props as GenFormTextProps } from './MxRC__FormText.gen';
import { make as GenFormTextPassword } from './MxRC__FormTextPassword.gen';
import type { Props as GenFormTextPasswordProps } from './MxRC__FormTextPassword.gen';

type OverrideProps = 'id' | 'name' | 'ref' | 'placeholder' | 'onChange' | 'onBlur' | 'status';

type FormProps = Props<Record<string, any>, Record<string, any>>;
const Form = make as ComponentType<FormProps>;

interface FormTextPasswordProps extends Omit<GenFormTextPasswordProps, 'fieldProps'> {
  fieldProps?: Omit<GenFormTextPasswordProps['fieldProps'], OverrideProps>;
}
const FormPassword = GenFormTextPassword as ComponentType<FormTextPasswordProps>;

interface FormTextProps extends Omit<GenFormTextProps, 'fieldProps'> {
  fieldProps?: Omit<GenFormTextProps['fieldProps'], OverrideProps>;
}
const FormText = GenFormText as ComponentType<FormTextProps> & { Password: typeof FormPassword };
FormText.Password = FormPassword;

export { useForm } from 'react-hook-form';
export { Form, FormField, FormText, FormPassword };
export type { FormProps, FormFieldProps, FormTextProps, FormTextPasswordProps };
