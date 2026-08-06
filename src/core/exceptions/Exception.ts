import { BaseException } from "./BaseException.js";

export class Exception extends BaseException {
  constructor(message?: string, body?: any, status?: number) {
    super(message, body, status);
  }
}
