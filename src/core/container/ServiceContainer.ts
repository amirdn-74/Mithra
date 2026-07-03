import type { Injectable, InjectableConstructor } from "./Injectable.js";

export class ServiceContainer {
  private static _instance: ServiceContainer;

  protected services: Map<string, Injectable> = new Map();

  private constructor() {}

  bind<T extends Injectable>(injectable: InjectableConstructor<T>): T {
    const _injectable = new injectable();

    this.services.set(injectable.injectionName, _injectable);

    return _injectable;
  }

  resolve<T extends Injectable>(injected: InjectableConstructor<T>): T {
    const _service = this.services.get(injected.injectionName);

    return (_service as T) ?? this.bind<T>(injected);
  }

  pop<T extends Injectable>(injected: InjectableConstructor<T>): T {
    const _service = this.services.get(injected.injectionName);

    if (_service) {
      this.services.delete(injected.injectionName);
      return _service as T;
    }

    throw new Error(
      "try to access undefined service: " + injected.injectionName,
    );
  }

  bindInstance<T extends Injectable>(injectable: T): T {
    const constructor = injectable.constructor as InjectableConstructor<T>;
    this.services.set(constructor.injectionName, injectable);

    return injectable;
  }

  singleton<T extends Injectable>(injectable: InjectableConstructor<T>): T {
    return (
      (this.services.get(injectable.injectionName) as T) ??
      this.bind(injectable)
    );
  }

  bound<T extends Injectable>(injected: InjectableConstructor<T>): boolean {
    return this.services.has(injected.injectionName);
  }

  get<T extends Injectable>(injected: InjectableConstructor<T>): T | undefined {
    return this.services.get(injected.injectionName) as T;
  }

  forget<T extends Injectable>(injected: InjectableConstructor<T>): void {
    const _service = this.services.get(injected.injectionName);

    if (_service) this.services.delete(injected.injectionName);
  }

  static getContainer(): ServiceContainer {
    return (ServiceContainer._instance ??= new ServiceContainer());
  }
}
