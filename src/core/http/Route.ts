import { Application } from "../application/Application.js";
import type { Middleware } from "./contracts/Middleware.js";
import type { RouteHandler } from "./contracts/RouteHnadler.js";
import type { RouteObject } from "./contracts/RouteObject.js";
import express, {
  Router,
  type RouterOptions,
  type Request as ExpressRequest,
  type Response as ExpressResponse,
  type RequestHandler,
  type NextFunction,
} from "express";
import { Request } from "./Request.js";
import { Response } from "./Response.js";

export class Route {
  protected _routes: RouteObject[] = [];
  protected _globalMiddlewares: Middleware[] = [];
  protected _baseRouter: Router;
  protected _app: Application;

  constructor(options?: RouterOptions) {
    this._baseRouter = express.Router({ strict: true });
    this._app = Application.instance;
  }

  get(path: string, handler: RouteHandler): this {
    Application.baseApp.get(path, this.createHandler(handler));
    return this;
  }

  post(path: string, handler: RouteHandler): this {
    Application.baseApp.post(path, this.createHandler(handler));
    return this;
  }

  put(path: string, handler: RouteHandler): this {
    Application.baseApp.put(path, this.createHandler(handler));
    return this;
  }

  patch(path: string, handler: RouteHandler): this {
    Application.baseApp.patch(path, this.createHandler(handler));
    return this;
  }

  delete(path: string, handler: RouteHandler): this {
    Application.baseApp.delete(path, this.createHandler(handler));
    return this;
  }

  group(cb: () => void): this {
    return this;
  }

  middleware(middlewares: Middleware | Middleware[]): this {
    return this;
  }

  prefix(prefix: string): this {
    return this;
  }

  name(name: string): this {
    return this;
  }

  protected createHandler(handler: RouteHandler): RequestHandler {
    return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      handler(new Request(req, next), new Response(res));
    };
  }
}
