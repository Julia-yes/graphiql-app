export const checkRows = (data: string) => {
  const numNewlines = (data.match(/\n/g) || []).length + 1;
  return numNewlines ? numNewlines : 1;
};
