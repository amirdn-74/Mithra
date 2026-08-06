import { BaseException } from "./BaseException.js";

export class NotFoundException extends BaseException {
  constructor(message?: string) {
    if (!message) message = "Not found exception!";

    super(message, null, 404);
  }
}
