type DocField = {
  [index: string]: string | null | { name: string; type: string; description: string | null }[];
  name: string;
  description: string | null;
  type: string | null;
  value: string | null;
};

export default DocField;
