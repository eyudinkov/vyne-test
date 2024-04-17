import { getValue } from './getValue';

export function getToken(authObj: string | null): string {
  const auth = authObj !== null ? authObj : '{}';
  const obj = JSON.parse(auth);
  const token = getValue(obj, 'credentials.token');

  return token;
}
