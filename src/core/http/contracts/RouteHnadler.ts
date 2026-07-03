import type { Request } from "../Request.js";
import type { Response } from "../Response.js";

export type RouteHandler = (req?: Request, res?: Response) => any;
