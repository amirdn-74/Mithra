import type { Request } from "../../http/Request.js";
import type { Response } from "../../http/Response.js";


export type RouteHandler = (req?: Request, res?: Response) => any;
