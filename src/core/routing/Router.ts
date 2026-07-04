import { Application } from "../application/Application.js";
import type { RouteHandler } from "./contracts/RouteHnadler.js";
import type { RouteObject } from "./contracts/RouteObject.js";
import express, {
  Router as ExpressRouter,
  type RouterOptions,
  type Request as ExpressRequest,
  type Response as ExpressResponse,
  type NextFunction,
  type RequestHandler,
} from "express";
import type { RouteGroupObject } from "./contracts/RouteGroupObject.js";
import type { Middleware } from "../http/contracts/Middleware.js";
import type { HttpMethod } from "../http/contracts/HttpMethod.js";
import { Request } from "../http/Request.js";
import { Response } from "../http/Response.js";
import { RouteRecord } from "./RouteRecord.js";
import type { Constructor } from "../../common/contracts/Constructor.js";

export class Router {
  protected static _routes: RouteObject[] = [];
  protected static _globalMiddlewares: Middleware[] = [];

  protected static _groupStack: RouteGroupObject[] = [];
  protected static _pending: RouteGroupObject = {
    middlewares: [],
    prefix: "",
    name: "",
  };

  protected _baseRouter: ExpressRouter;
  protected _app: Application;

  constructor(options?: RouterOptions) {
    this._baseRouter = express.Router({ strict: true });
    this._app = Application.instance;
  }

  get(path: string, handler: RouteHandler): RouteRecord {
    return this.preserveRoute("get", path, handler);
  }

  post(path: string, handler: RouteHandler): RouteRecord {
    return this.preserveRoute("post", path, handler);
  }

  put(path: string, handler: RouteHandler): RouteRecord {
    return this.preserveRoute("put", path, handler);
  }

  patch(path: string, handler: RouteHandler): RouteRecord {
    return this.preserveRoute("patch", path, handler);
  }

  delete(path: string, handler: RouteHandler): RouteRecord {
    return this.preserveRoute("delete", path, handler);
  }

  group(cb: () => void): void {
    const parent = this.currentContext();

    Router._groupStack.push({
      prefix: parent.prefix + Router._pending.prefix,
      name: parent.name + Router._pending.name,
      middlewares: [...parent.middlewares, ...Router._pending.middlewares],
    });

    Router._pending = {
      middlewares: [],
      prefix: "",
      name: "",
    };

    cb();

    Router._groupStack.pop();
  }

  middleware(
    middlewares: Constructor<Middleware> | Constructor<Middleware>[],
  ): this {
    const list = Array.isArray(middlewares) ? middlewares : [middlewares];

    Router._pending.middlewares = [...Router._pending.middlewares, ...list];

    return this;
  }

  prefix(prefix: string): this {
    Router._pending.prefix = Router._pending.prefix + prefix;

    return this;
  }

  name(name: string): this {
    Router._pending.name = Router._pending.name + name;

    return this;
  }

  registerRoutes() {
    Router._routes.forEach((route) => {
      Application.baseApp[route.method](route.path, [], route.handler);
    });
  }

  getRouteList(): RouteObject[] {
    return Router._routes;
  }

  protected currentContext(): RouteGroupObject {
    return (
      Router._groupStack.at(-1) ?? { prefix: "", middlewares: [], name: "" }
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
    const ctx = this.currentContext();

    const _handler = (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      handler(new Request(req, next), new Response(res));
    };

    const route: RouteObject = {
      path: ctx.prefix + Router._pending.prefix + path,
      method,
      handler: _handler,
      middlewares: [...ctx.middlewares, ...Router._pending.middlewares],
      name: ctx.name + Router._pending.name,
    };

    Router._pending = {
      middlewares: [],
      name: "",
      prefix: "",
    };

    Router._routes.push(route);

    return new RouteRecord(route);
  }

  protected normalizeMiddlewaresToExpressMiddleware(
    middlewares: Constructor<Middleware>[],
  ): RequestHandler[] {
    const _normalizedMiddlewares: RequestHandler[] = [];

    middlewares.forEach(middleware => {
      //
    });

    return _normalizedMiddlewares;
  }
}
