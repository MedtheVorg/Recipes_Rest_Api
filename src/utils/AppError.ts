export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type AppErrorArgs = {
  name?: string;
  httpCode: HttpCode;
  description: string;
};

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;

  constructor(args: AppErrorArgs) {
    super(args.description);

    //Sets the prototype of the created AppError instance to the prototype of the class.
    // This ensures that the instance has the correct inheritance chain. (whatever that means lol)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.httpCode;

    // Captures the current stack trace for the error instance.
    // This is useful for debugging to trace back the sequence of function calls that led to the error.
    Error.captureStackTrace(this);
  }
}
