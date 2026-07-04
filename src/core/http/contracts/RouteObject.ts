import type { RequestHandler } from "express";
import type { HttpMethod } from "./HttpMethod.js";
import type { Middleware } from "./Middleware.js";

export interface RouteObject {
  path: string;
  method: HttpMethod;
  group: number;
  handler: RequestHandler,
  middlewares?: Middleware[];
  name?: string;
}
