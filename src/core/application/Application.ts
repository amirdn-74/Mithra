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

  private constructor(options?: AppConfigOptions) {
    this.setConfigOptions(options);
    this.container = ServiceContainer.getContainer();
  }

  static create(options?: AppConfigOptions) {
    return (Application._instance ??= new Application(options));
  }

  static get instance(): Application {
    return Application._instance;
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
}
