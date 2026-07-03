import type { Middleware } from "./Middleware.js";

export interface RouteObject {
    path: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    middlewares?: Middleware[],
    name?: string
}
