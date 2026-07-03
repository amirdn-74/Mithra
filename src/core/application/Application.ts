import express, { type Express } from "express";
import type {
  Injectable,
  InjectableConstructor,
} from "../container/Injectable.js";
import { ServiceContainer } from "../container/ServiceContainer.js";
import type { AppConfigOptions } from "./contracts/AppConfigOptions.js";

export class Application {
  protected static _instance: Application;
  protected container: ServiceContainer;
  protected configOptions!: AppConfigOptions;

  protected _app!: Express;

  private constructor(options?: AppConfigOptions) {
    this.setConfigOptions(options);
    this.container = ServiceContainer.getContainer();
    this.createBaseApp();
  }

  static create(options?: AppConfigOptions): Application {
    if (!Application._instance)
      Application._instance = new Application(options);

    return Application._instance;
  }

  protected createBaseApp() {
    this._app = express();
  }

  static get instance(): Application {
    if (!Application._instance) {
      throw new Error(
        "Application has not been created yet. Call Application.create() first.",
      );
    }

    return Application._instance;
  }

  static get baseApp(): Express {
    return Application.instance._app;
  }

  protected setConfigOptions(options?: AppConfigOptions) {
    const _options: AppConfigOptions = {};

    this.configOptions = _options;
  }

  static bind<T extends Injectable>(injectable: InjectableConstructor<T>): T {
    return Application.instance.container.bind(injectable);
  }

  static resolve<T extends Injectable>(
    resolvable: InjectableConstructor<T>,
  ): T {
    return Application.instance.container.resolve(resolvable);
  }

  static pop<T extends Injectable>(injected: InjectableConstructor<T>): T {
    return Application.instance.container.pop(injected);
  }

  static bindInstance<T extends Injectable>(injetable: T): T {
    return Application.instance.container.bindInstance(injetable);
  }

  static singleton<T extends Injectable>(
    injectable: InjectableConstructor<T>,
  ): T {
    return Application.instance.container.singleton(injectable);
  }

  static bound<T extends Injectable>(
    injected: InjectableConstructor<T>,
  ): boolean {
    return Application.instance.container.bound(injected);
  }

  static get<T extends Injectable>(
    injected: InjectableConstructor<T>,
  ): T | undefined {
    return Application.instance.container.get(injected);
  }

  static forget<T extends Injectable>(
    injected: InjectableConstructor<T>,
  ): void {
    Application.instance.container.forget(injected);
  }

  middlewares() {
    //
  }

  run(port: number, cb?: () => void) {
    this._app.listen(port, cb);
  }
}
