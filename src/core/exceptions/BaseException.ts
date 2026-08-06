export abstract class BaseException {
  protected message?: string;
  protected body?: any;
  protected status?: number;

  constructor(message?: string, body?: any, status?: number) {
    if (message) this.message = message;

    if (body) this.body = body;

    this.status = status || 500;
  }

  getMessage() {
    return this.message;
  }

  getBody() {
    return this.body;
  }

  getStatus() {
    return this.status!;
  }
}
