import { Application } from "../application/Application.js";
import type { Middleware } from "./contracts/Middleware.js";
import type { RouteHandler } from "./contracts/RouteHnadler.js";
import type { RouteObject } from "./contracts/RouteObject.js";
import express, {
  Router,
  type RouterOptions,
  type Request as ExpressRequest,
  type Response as ExpressResponse,
  type NextFunction,
} from "express";
import { Request } from "./Request.js";
import { Response } from "./Response.js";
import type { HttpMethod } from "./contracts/HttpMethod.js";
import type { RouteGroupObject } from "./contracts/RouteGroupObject.js";

export class Route {
  protected static _routes: RouteObject[] = [];
  protected static _globalMiddlewares: Middleware[] = [];

  protected static _groupStack: RouteGroupObject[] = [];
  protected static _pending: RouteGroupObject = {
    middlewares: [],
    prefix: "",
    name: "",
  };

  protected _baseRouter: Router;
  protected _app: Application;

  constructor(options?: RouterOptions) {
    this._baseRouter = express.Router({ strict: true });
    this._app = Application.instance;
  }

  get(path: string, handler: RouteHandler): this {
    this.preserveRoute("get", path, handler);
    return this;
  }

  post(path: string, handler: RouteHandler): this {
    this.preserveRoute("post", path, handler);
    return this;
  }

  put(path: string, handler: RouteHandler): this {
    this.preserveRoute("put", path, handler);
    return this;
  }

  patch(path: string, handler: RouteHandler): this {
    this.preserveRoute("patch", path, handler);
    return this;
  }

  delete(path: string, handler: RouteHandler): this {
    this.preserveRoute("delete", path, handler);
    return this;
  }

  group(cb: () => void): this {
    const parent = this.currentContext();

    Route._groupStack.push({
      prefix: parent.prefix + Route._pending.prefix,
      name: parent.name + Route._pending.name,
      middlewares: [...parent.middlewares, ...Route._pending.middlewares],
    });

    Route._pending = {
      middlewares: [],
      prefix: "",
      name: "",
    };

    cb();

    Route._groupStack.pop();

    return this;
  }

  middleware(middlewares: Middleware | Middleware[]): this {
    const list = Array.isArray(middlewares) ? middlewares : [middlewares];

    Route._pending.middlewares = [...Route._pending.middlewares, ...list];

    return this;
  }

  prefix(prefix: string): this {
    Route._pending.prefix = Route._pending.prefix + prefix;

    return this;
  }

  name(name: string): this {
    Route._pending.name = Route._pending.name + name;

    return this;
  }

  peek() {
    console.log(Route._routes);
  }

  protected currentContext(): RouteGroupObject {
    return (
      Route._groupStack.at(-1) ?? { prefix: "", middlewares: [], name: "" }
    );
  }

  protected createRouteGroup(): RouteGroupObject {
    return {
      middlewares: [],
      name: "",
      prefix: "",
    };
  }

  protected preserveRoute(
    method: HttpMethod,
    path: string,
    handler: RouteHandler,
  ) {
    const _handler = (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      handler(new Request(req, next), new Response(res));
    };

    Route._routes.push({
      path,
      method,
      group: 0,
      handler: _handler,
    });
  }

  registerRoutes() {
    Route._routes.forEach((route) => {
      Application.baseApp[route.method](route.path, route.handler);
    });
  }
}
