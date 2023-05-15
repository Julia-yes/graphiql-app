export const ParseData = (data: string) => {
  const parsedRequest: string[] = [];
  JSON.stringify(data)
    .match(/[a-zA-Z}${()]+/g)
    ?.forEach((item) => {
      if (item !== 'n') {
        parsedRequest.push(item);
      }
    });
  let parseResult = parsedRequest
    .join(' ')
    .replace(/([\(\){},])/g, ' $1 ')
    .split(' ');
  return parseResult;
};

export const FinalViewOFRequest = (data: string) => {
    
  const result = ParseData(data).join(' ');
  const res = result.replace(/([\{\}])/g, '$1\n');
  console.log(res);
  return res;
  
};