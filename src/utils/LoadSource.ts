export const LoadSource = async (query: string, variables: string) => {
  const apiUrl = `https://rickandmortyapi.com/graphql`;
  if (variables) variables = JSON.parse(variables);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error('Could not load the data from the resourse');
  } else {
    const data = await response.json();
    return data;
  }
};
