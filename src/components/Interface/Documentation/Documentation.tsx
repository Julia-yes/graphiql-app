import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';
import { useState, useEffect } from 'react';
import styles from './Documentation.module.scss';

const schemaUrl = 'https://rickandmortyapi.com/graphql';

type DocField = {
  [index: string]: string | null | { name: string; type: string; description: string | null }[];
  name: string;
  description: string | null;
  type: string | null;
  value: string | null;
};

type DocType = {
  name: string;
  description: string | null;
  fields: DocField[] | null;
};

export const Documentation = () => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [types, setTypes] = useState<DocType[]>([]);
  const [selectedType, setSelectedType] = useState<DocType>();

  useEffect(() => {
    async function fetchSchema() {
      const response = await fetch(schemaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });
      const { data }: { data: IntrospectionQuery } = await response.json();
      const clientSchema = buildClientSchema(data);
      setSchema(clientSchema);
    }

    fetchSchema();
  }, []);

  useEffect(() => {
    if (schema) {
      const typeMap = schema.getTypeMap();

      console.log(schema);

      const typesInMap = Object.keys(typeMap)
        .filter((typeName) => !typeName.startsWith('__'))
        .map((typeName) => {
          const type = typeMap[typeName];
          let typeFields: DocField[] | undefined;

          if (
            type instanceof GraphQLObjectType ||
            type instanceof GraphQLInterfaceType ||
            type instanceof GraphQLInputObjectType
          ) {
            const fields = type.getFields();
            typeFields = Object.keys(fields).map((fieldName) => {
              const field = fields[fieldName];
              return {
                name: field.name,
                description: (field.description as string) || null,
                type: field.type.toString(),
                value: null,
              };
            });
          } else if (type instanceof GraphQLEnumType) {
            const values = type.getValues();
            typeFields = values.map((value) => {
              return {
                name: value.name,
                description: (value.description as string) || null,
                type: null,
                value: value.value,
              };
            });
          }

          return {
            name: type.name,
            description: (type.description as string) || null,
            fields: typeFields || null,
          };
        });
      setTypes(typesInMap);
    }
  }, [schema]);

  function handleSelectType(type: DocType) {
    setSelectedType(type);
  }

  function handleSelectField(name: string) {
    const regExp = /\[(.*?)\]/;
    const typeName = regExp.exec(name) ? regExp.exec(name)![1] : name;
    console.log(typeName);
    const type = types.find((type) => type.name === typeName);
    if (type) {
      setSelectedType(type);
    }
  }

  return (
    <div className={styles.documentation}>
      <div className='sidebar'>
        <h2 className={styles.title}>Documentation</h2>
        <ul>
          {types.map((type) => (
            <li key={type.name} onClick={() => handleSelectType(type)}>
              <h4>{type.name}</h4>
            </li>
          ))}
        </ul>
      </div>
      <div className='content'>
        {selectedType ? (
          <div>
            <h3>{selectedType.name}</h3>
            {selectedType.description && <p>{selectedType.description}</p>}
            {selectedType.fields?.map((field) => (
              <div key={field.name} onClick={() => handleSelectField(field.type || '')}>
                <h4>{field.name}</h4>:<span className='code'>{field.type || field.value}</span>
                {field.description && <p>{field.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>Select a type from the documentation.</p>
        )}
      </div>
    </div>
  );
};
