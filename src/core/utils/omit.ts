export function omit<T extends object, K extends keyof T | Array<keyof T>>(
  obj: T,
  props: K | K[]
): T {
  if (Array.isArray(props)) {
    return (Object.keys(obj) as Array<keyof T>).reduce(
      (tempObj: T, key: keyof T) => {
        if ((props as Array<keyof T>).includes(key)) {
          return tempObj;
        }
        return {
          ...tempObj,
          [key]: obj[key],
        };
      },
      {} as T
    );
  } else {
    return omit(obj, [props] as Array<keyof T>);
  }
}
