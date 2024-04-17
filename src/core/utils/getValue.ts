function propToArray(prop: string) {
  return prop
    .split('.')
    .reduce((ret: string[], el: string, index: number, list: string[]) => {
      const last = index > 0 && list[index - 1];
      if (last && /(?:^|[^\\])\\$/.test(last)) {
        const prev = ret.pop();
        ret.push(prev?.slice(0, -1) + '.' + el);
      } else {
        ret.push(el);
      }
      return ret;
    }, []);
}

export function getValue<T>(
  obj: T,
  prop: number | string | string[],
  value: any = ''
) {
  const propArray =
    typeof prop === 'number'
      ? propToArray(String(prop))
      : typeof prop === 'string'
      ? propToArray(prop)
      : prop;

  let current: any = obj;

  for (let i = 0; i < propArray.length; i++) {
    if (current === null || typeof current !== 'object') {
      return value;
    }
    const key: any = propArray[i];
    if (Array.isArray(current) && key === '$end') {
      current = current[current.length - 1];
    } else {
      current = current[key];
    }
  }

  return typeof current === 'undefined' ? value : current;
}
