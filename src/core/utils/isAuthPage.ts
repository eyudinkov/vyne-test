export function isAuthPage(url: string): boolean {
  const segments = url.split('/').filter((el) => el !== '');
  return (
    url === '/' || !!(segments.length && ['login'].includes(segments?.[0]))
  );
}
