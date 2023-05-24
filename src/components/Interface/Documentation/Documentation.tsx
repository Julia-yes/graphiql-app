import {
  getIntrospectionQuery,
  buildClientSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../Loading/Loading';
import DocType from '../../../types/DocType';
import DocField from '../../../types/DocField';
import styles from './Documentation.module.scss';
import { Localization } from '../../../enums/Localization';

const schemaUrl = 'https://rickandmortyapi.com/graphql';

type DocProps = {
  isDocShowed: boolean;
};
export const Documentation = ({ isDocShowed }: DocProps) => {
  const [types, setTypes] = useState<DocType[]>([]);
  const [history, setHistory] = useState<DocType[]>([]);
  const [selectedType, setSelectedType] = useState<DocType | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchSchema();

    function fetchSchema() {
      fetch(schemaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(({ data }) => buildClientSchema(data))
        .then((schema) => {
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
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setErr(error.message);
        });
    }
  }, []);

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
    let typeName: string;
    if (regExp.exec(name)) {
      const newName = regExp.exec(name) as RegExpExecArray;
      typeName = newName[1];
    } else {
      typeName = name;
    }
    const type = types.find((type) => type.name === typeName);
    if (type) {
      setHistory([...history, type]);
    }
  }

  function goBackInHistory() {
    setHistory(history.slice(0, -1));
  }

  let docClasses = styles.documentation;
  if (isDocShowed) {
    docClasses += ' ' + styles.documentation_showed;
  }

  return (
    <div className={docClasses}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>Documentation</h2>
        <span className={`material-icons ` + styles.button} onClick={() => goBackInHistory()}>
          arrow_back
        </span>
      </div>
      <span className={`material-icons ` + styles.button} onClick={() => goBackInHistory()}>
        arrow_back
      </span>
      <h2 className={styles.title}>{t(Localization.DOC)}</h2>
      {!isLoading ? (
        !err ? (
          selectedType ? (
            <div className={styles.wrapper}>
              <h3 className={styles.subtitle}>{selectedType.name}</h3>
              {selectedType.description && <p>{selectedType.description}</p>}
              {selectedType.fields?.map((field) => (
                <div
                  className={styles.field}
                  key={field.name}
                  onClick={() => handleSelectField(field.type || '')}
                >
                  <h4 className={styles.field_title}>{field.name}</h4>:
                  <span className={styles.field_type}>{field.type || field.value}</span>
                  {field.description && <p>{field.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.wrapper}>
              <ul className={styles.type_list}>
                {types.map((type) => (
                  <li
                    className={styles.list_item}
                    key={type.name}
                    onClick={() => handleSelectType(type)}
                  >
                    <h4>{type.name}</h4>
                  </li>
                ))}
              </ul>
              <p className={styles.desc}>Select a type from the documentation.</p>
            </div>
          )
        ) : (
          <p>{err}</p>
        )
      ) : (
        <Loading type={'spinningBubbles'} color={'#1b2240'} />
      )}
    </div>
  );
};
