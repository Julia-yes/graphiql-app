import { Links } from '../enums/Links';

export const LoadSource = async (
  query: string,
  variables: string,
  headers: string,
  headersKey: string
) => {
  const requestHeaders: HeadersInit = {
    'Content-type': 'application/json',
  };

  if (variables) variables = JSON.parse(variables);
  if (headers && headersKey) {
    requestHeaders[headersKey] = headers;
  }

  const response = await fetch(Links.API_URL, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error('Could not load the data from the resourse');
  } else {
    const data = await response.json();
    return data;
  }
};
