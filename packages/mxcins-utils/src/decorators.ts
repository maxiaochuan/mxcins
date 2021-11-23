// eslint-disable-next-line import/prefer-default-export
export function enumerable(value: boolean) {
  return function inner<T>(target: T, propertyKey: string): void {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    if (descriptor.enumerable !== value) {
      descriptor.enumerable = value;
      descriptor.writable = true;
      Object.defineProperty(target, propertyKey, descriptor);
    }
  };
}
