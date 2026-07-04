import type { RequestHandler } from "express";
import type { HttpMethod } from "../../http/contracts/HttpMethod.js";
import type { Middleware } from "../../http/contracts/Middleware.js";
import type { Constructor } from "../../../common/contracts/Constructor.js";

export interface RouteObject {
  path: string;
  method: HttpMethod;
  handler: RequestHandler;
  middlewares?: Constructor<Middleware>[];
  name?: string;
}
