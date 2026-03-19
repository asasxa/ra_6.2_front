import type INote from './components/INote';

export default async function createRequest(url: string, errorMessage: string, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(errorMessage + ': ' + response.status);
  }

  if (response.status === 204) return;

  const data = await response.json() as INote[];
  return data;
};