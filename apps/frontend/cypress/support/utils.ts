export function apiUrlResolver(url: string) {
  return `${Cypress.env('API_URL')}${url}`;
}

export async function getBlobFromBase64(data: string, type = '') {
  const url = `data:${type};base64,${data}`;
  const res = await fetch(url);
  const blob = await res.blob();

  return blob;
}
