export const LoadSource = async (query: string) => {
  const apiUrl = `https://rickandmortyapi.com/graphql`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Could not load the data from the resourse');
  } else {
    const data = await response.json();
    return data;
  }
};
