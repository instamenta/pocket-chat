export function extractAuthToken() {
  const data = document.cookie.split('; ')
    .find(c => c.startsWith('X-Authorization-Token='));

  return data ? data.slice('X-Authorization-Token='.length) : null;
}