import { Injectable } from "../container/Injectable.js";
import { type Request as ExpressRequest, type NextFunction } from "express";

export class Request extends Injectable {
  protected _vault: Map<string, unknown> = new Map();

  constructor(
    protected readonly _baseRequest: ExpressRequest,
    protected readonly _next: NextFunction,
  ) {
    super();
  }

  get body() {
    return this._baseRequest.body;
  }

  get baseUrl() {
    return this._baseRequest.baseUrl;
  }

  get subdomains() {
    return this._baseRequest.subdomains;
  }

  get ip() {
    return this._baseRequest.ip;
  }

  get ips() {
    return this._baseRequest.ips;
  }

  get cookies() {
    return this._baseRequest.cookies;
  }

  get headers() {
    return this._baseRequest.headers;
  }

  get host() {
    return this._baseRequest.host;
  }

  get hostName() {
    return this._baseRequest.hostname;
  }

  get method() {
    return this._baseRequest.method;
  }

  get originalUrl() {
    return this._baseRequest.originalUrl;
  }

  get params() {
    return this._baseRequest.params;
  }

  get path() {
    return this._baseRequest.path;
  }

  get protocol() {
    return this._baseRequest.protocol;
  }

  get query() {
    return this._baseRequest.query;
  }

  get url() {
    return this._baseRequest.url;
  }

  input(key: string, defaultValue: any) {
    //
  }

  param(key: string, defaultValue: any) {
    //
  }

  validate(rules: any, messages: any) {
    //
  }

  next() {
    this._next();
  }

  set<T>(key: string, value: T): T {
    this._vault.set(key, value);

    return value;
  }

  get<T = any>(key: string, defaultValue: T): T {
    if (this._vault.has(key)) return this._vault.get(key) as T;

    return defaultValue;
  }

  pop<T = any>(key: string): T {
    if (!this._vault.has(key))
      throw new Error("try to pop undefined key: " + key);

    const value = this._vault.get(key) as T;
    this._vault.delete(key);

    return value;
  }
}
