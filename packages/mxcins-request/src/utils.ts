// tslint:disable:max-classes-per-file

export class RequestError extends Error {
  constructor(text: string) {
    super(text);
    this.name = 'RequestError';
  }
}

export class ResponseError extends Error {
  public response: Response;
  public data: any;
  constructor(response: Response, text: string, data?: any) {
    super(text);
    this.name = 'ReponseError';
    this.response = response;
    this.data = data;
  }
}

export function safeJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
