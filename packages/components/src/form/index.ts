import { ComponentType } from 'react';
import { make } from './MxRC__Form.gen';
import type { Props } from './MxRC__Form.gen';
import { make as FormText } from './MxRC__FormText.gen';
import { make as FormPassword } from './MxRC__FormPassword.gen';

type FormProps = Props<Record<string, any>, Record<string, any>>

type FormComponent = ComponentType<FormProps>;

const Form = make as FormComponent

export { useForm } from 'react-hook-form';
export { Form, FormText, FormPassword };
export type { FormProps };
