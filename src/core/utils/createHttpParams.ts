import { HttpParams } from '@angular/common/http';
import { HttpParameterCodec } from '@angular/common/http';

import { isDefined } from './isDefined';

class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return key;
  }
  encodeValue(value: string): string {
    return value;
  }
  decodeKey(key: string): string {
    return key;
  }
  decodeValue(value: string): string {
    return value;
  }
}

const customHttpParamEncoder = new CustomHttpParamEncoder();

export function createHttpParams(params: { [key: string]: unknown }) {
  params = Object.entries(params).reduce(
    (acc: { [key: string]: unknown }, [key, value]) => {
      if (isDefined(value)) {
        return {
          ...acc,
          [key]: String(value),
        };
      }
      return acc;
    },
    {}
  );
  let httpParams = new HttpParams({
    fromObject: params as {
      [param: string]:
        | string
        | number
        | boolean
        | readonly (string | number | boolean)[];
    },
    encoder: customHttpParamEncoder,
  });

  return httpParams;
}
