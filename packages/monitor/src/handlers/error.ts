import { EVENT_TYPE, Handler } from "../types";

const ErrorHandler: Handler<Error> = {
  name: EVENT_TYPE.ERROR,
  run: (error) => {
    // const { target } = error;
    // TODO: 

    const result = {
      type: EVENT_TYPE.ERROR,
    }

    return result;
  }
}

export default ErrorHandler;
