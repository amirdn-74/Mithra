import type { Constructor } from "../../../common/contracts/Constructor.js";
import type { Middleware } from "../../http/contracts/Middleware.js";

export interface RouteGroupObject {
  middlewares: Constructor<Middleware>[];
  name: string;
  prefix: string;
}
