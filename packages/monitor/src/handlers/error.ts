import ErrorStackParser from 'error-stack-parser';
import { type EventHandler } from '../types';

export interface ErrorResult {
  fname: string;
  message: string;
  line: number;
  column: number;
}

const ErrorHandler: EventHandler<'error'> = {
  name: 'error',
  handle: error => {
    const { message } = error;
    const frames = ErrorStackParser.parse(error);
    const { fileName: fname = '', columnNumber: column = 0, lineNumber: line = 0 } = frames[0];

    const result = {
      fname,
      message,
      line,
      column,
    };

    return result;
  },
};

export default ErrorHandler;
