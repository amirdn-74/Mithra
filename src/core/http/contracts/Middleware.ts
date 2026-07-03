import type { Request } from "../Request.js";
import type { Response } from "../Response.js";

export interface Middleware {
    handle(req: Request, res: Response): void;
}