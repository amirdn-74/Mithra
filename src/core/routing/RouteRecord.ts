import type { Constructor } from "../../common/contracts/Constructor.js";
import type { Middleware } from "../http/contracts/Middleware.js";
import type { RouteObject } from "./contracts/RouteObject.js";

export class RouteRecord {
  constructor(private readonly route: RouteObject) {}

  middleware(middlewares: Constructor<Middleware> | Constructor<Middleware>[]) {
    const list = Array.isArray(middlewares) ? middlewares : [middlewares];

    this.route.middlewares?.push(...list);

    return this;
  }

  name(name: string) {
    this.route.name = this.route.name + name;

    return this;
  }
}
