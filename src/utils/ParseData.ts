export const ParseData = (data: string) => {
  const parsedRequest: string[] = [];
  JSON.stringify(data)
    .match(/[a-zA-Z0-9}${():,\[\]]+/g)
    ?.forEach((item) => {
      if (item !== 'n') {
        parsedRequest.push(item);
      }
    });
  console.log('parse', parsedRequest);
  return parsedRequest;
};

export const EditRequest = (data: string) => {
  const parsedRequest = ParseData(data);
  let result = parsedRequest
    .join(' ')
    .replace(/([{}])/g, '$1')
    .split(' ');
  return result;
};

export const ParseDataBySymbols = (data: string) => {
  const parsedRequest = ParseData(data);
  let result = parsedRequest
    .join(' ')
    .replace(/([{}():])/g, ' $1 ')
    .split(' ');
  return result;
};

export const FinalViewOFRequest = (data: string) => {
  const parsedData = ParseData(data).join(' ');
  const result = parsedData.replace(/([\{\}\[\],])/g, '$1\n');
  return result;
};
