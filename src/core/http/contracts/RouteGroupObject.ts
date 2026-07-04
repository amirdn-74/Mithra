import type { Middleware } from "./Middleware.js";

export interface RouteGroupObject {
  middlewares: Middleware[];
  name: string;
  prefix: string;
}
