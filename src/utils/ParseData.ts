export const ParseData = (data: string) => {
  const parsedRequest: string[] = [];
  JSON.stringify(data)
    .match(/[a-zA-Z0-9}${():'",\[\]]+/g)
    ?.forEach((item) => {
      if (item !== 'n') {
        parsedRequest.push(item);
      }
    });
  return parsedRequest.join(' ');
};

export const ParseDataBySymbols = (data: string) => {
  const parsedRequest = ParseData(data);
  let result = parsedRequest
    .replace(/['"]/g, '')
    .replace(/([{}():])/g, ' $1 ')
    .split(' ');
  return result;
};

export const FinalViewOFResponse = (data: string) => {
  let parsedData = ParseData(data).split(' ');
  let string = parsedData
    .join(' ')
    .replace(/\ \":/g, '": ')
    .replace(/\  \"/g, ' "')
    .replace(/ ",/g, '",\n')
    .replace(/ "}/g, '"\n}')
    .replace(/,{/g, ',\n{')
    .replace(/,\ /g, ',\n ')
    .replace(/([\{\}\[\]])/g, '$1\n')
    .replace(/}\n,/g, '},')
    .replace(/([A-Za-z0-9])\s*}/g, '$1\n}');
  return string.slice(1, -1);
};

export const AddTabs = (data: string) => {
  let indentation = 0;
  const result = ParseData(data)
    .replace(/['"]/g, '')
    .replace(/[[{]/g, (match) => {
      let spaces = '  '.repeat(++indentation);
      return match + '\n' + spaces;
    })
    .replace(/[\]}]/g, (match) => {
      let spaces = '  '.repeat(--indentation);
      return '\n' + spaces + match;
    });
  return result;
};
