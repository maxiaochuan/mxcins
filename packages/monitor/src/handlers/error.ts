import ErrorStackParser from 'error-stack-parser';
import { EVENT_TYPE, Handler } from "../types";

interface Result {
  fname: string;
  message: string;
  line: number;
  column: number;
}

const ErrorHandler: Handler<Error, Result> = {
  name: EVENT_TYPE.ERROR,
  handle: (error) => {
    const { message } = error;
    const frames = ErrorStackParser.parse(error);
    const { fileName: fname = '', columnNumber: column = 0, lineNumber: line = 0 } = frames[0];

    const result = {
      fname,
      message,
      line,
      column,
    }

    return result;
  }
}

export default ErrorHandler;
