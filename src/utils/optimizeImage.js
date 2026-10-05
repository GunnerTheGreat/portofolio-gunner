export function optimizeImage(url, width = 800, quality = 75) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cdn.sanity.io')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&auto=format&q=${quality}`;
  }
  return url;
}
