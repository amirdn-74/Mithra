export abstract class Injectable {
  static get injectionName(): string {
    return this.name;
  }
}

export type InjectableConstructor<T extends Injectable = Injectable> = (new (
  ...args: any[]
) => T) & {
  readonly injectionName: string;
};
