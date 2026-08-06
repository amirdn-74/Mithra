export abstract class Controller {
  constructor() {
    const proto = Object.getPrototypeOf(this);

    for (const key of Object.getOwnPropertyNames(proto)) {
      if (key === "constructor") continue;

      const value = (this as any)[key];
      if (typeof value === "function") {
        (this as any)[key] = value.bind(this);
      }
    }
  }
}
