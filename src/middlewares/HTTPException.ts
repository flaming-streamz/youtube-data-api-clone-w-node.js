class HttpException extends Error {
  public status: number;
  public override message: string;

  constructor(message: string, status?: number) {
    super(message);

    this.status = status || 500;
    this.message = message;
  }
}

export class AuthenticationException extends HttpException {
  constructor() {
    super("Unauthenticated", 401);
  }
}

export class AuthorizationException extends HttpException {
  constructor() {
    super("Unauthenticated", 401);
  }
}

export default HttpException;
