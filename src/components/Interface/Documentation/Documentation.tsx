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
import DocType from '../../../types/DocType';
import DocField from '../../../types/DocField';
import styles from './Documentation.module.scss';

const schemaUrl = 'https://rickandmortyapi.com/graphql';

export const Documentation = () => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [types, setTypes] = useState<DocType[]>([]);
  const [history, setHistory] = useState<DocType[]>([]);
  const [selectedType, setSelectedType] = useState<DocType | null>(null);

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

  useEffect(() => {
    if (history.length === 0) {
      setSelectedType(null);
    } else {
      setSelectedType(history[history.length - 1]);
    }
  }, [history]);

  function handleSelectType(type: DocType) {
    setHistory([...history, type]);
  }

  function handleSelectField(name: string) {
    const regExp = /\[(.*?)\]/;
    const typeName = regExp.exec(name) ? regExp.exec(name)![1] : name;
    const type = types.find((type) => type.name === typeName);
    if (type) {
      setHistory([...history, type]);
    }
  }

  function goBackInHistory() {
    setHistory(history.slice(0, -1));
  }

  return (
    <div className={styles.documentation}>
      <button className={styles.back_button} onClick={() => goBackInHistory()}>
        назад
      </button>
      <div className='sidebar'>
        <h2 className={styles.title}>Documentation</h2>
        <ul className={styles.type_list}>
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
                <h4 className={styles.field}>{field.name}</h4>:
                <span className='code'>{field.type || field.value}</span>
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
