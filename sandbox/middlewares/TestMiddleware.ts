import type { Middleware } from "../../src/core/http/contracts/Middleware.js";
import type { Request } from "../../src/core/http/Request.js";
import type { Response } from "../../src/core/http/Response.js";

export class TestMiddleware implements Middleware {
    handle(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

}