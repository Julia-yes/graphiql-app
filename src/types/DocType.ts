import DocField from './DocField';

type DocType = {
  name: string;
  description: string | null;
  fields: DocField[] | null;
};

export default DocType;
