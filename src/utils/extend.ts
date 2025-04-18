export interface ExtendOptions {
  allOwnKeys?: boolean;
}
/**
 * 将源对象的属性和方法复制到目标对象
 * @param target 目标对象
 * @param source 源对象
 * @param thisArg this指向
 * @param options 配置选项
 */
export default function extend(
  target: any,
  source: any,
  thisArg?: any,
  options: ExtendOptions = {}
): void {
  const { allOwnKeys } = options;

  // 获取要复制的属性列表
  const properties = allOwnKeys
    ? Object.getOwnPropertyNames(source)
    : Object.keys(source);

  properties.forEach((property) => {
    // 获取属性描述符
    const descriptor = Object.getOwnPropertyDescriptor(source, property);

    if (!descriptor) return;

    // 如果是方法，需要绑定this
    if (typeof source[property] === "function") {
      target[property] = source[property].bind(thisArg);
    } else {
      // 使用属性描述符定义属性
      Object.defineProperty(target, property, {
        ...descriptor,
        value: source[property],
      });
    }
  });
}
