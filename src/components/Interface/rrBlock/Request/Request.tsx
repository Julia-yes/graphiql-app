import { useContext, useEffect, useState } from 'react';
import stylesCommon from '../RRBlock.module.scss';
import styles from './Request.module.scss';
import { DataContext } from '../../../../context/Context';
import { LoadSource } from '../../../../utils/LoadSource';
import { CheckStaples } from '../../../../utils/CheckStaples';
import { AddTabs, ParseDataBySymbols } from '../../../../utils/ParseData';
import { Button } from '../../../Button/Button';
import { EditorBlock } from '../../EditorBlock/EditorBlock';
import { Sections } from '../../../../enums/Sections';
import { SectionsBlock } from '../SectionsBlock/SectionsBlock';
import { checkRows } from '../../../../utils/CheckRows';

export const Request = () => {
  const {
    setNewData,
    setNewError,
    request,
    error,
    setNewLoading,
    setNewRequest,
    variables,
    setNewVariablesError,
    headers,
    headersKey,
  } = useContext(DataContext);
  const [queryTitle, setQueryTitle] = useState('');

  useEffect(() => {
    CheckRequest(request);
  }, [request]);

  useEffect(() => {
    setNewVariablesError('');
  }, [variables]);

  const MakeRequest = async () => {
    setNewData(null);
    const isGoodRequest = await CheckStaples(request);
    const isGoodVariables = variables ? await CheckVariables(variables) : true;
    if (isGoodVariables) {
      if (isGoodRequest) {
        setNewLoading(true);
        try {
          const data = await LoadSource(request, variables, headers, headersKey);
          setNewData(data);
        } catch (error) {
          setNewError('Invalid request');
        } finally {
          setNewLoading(false);
        }
      } else {
        setNewError('problem with staples');
      }
    } else {
      return;
    }
  };

  const CheckRequest = (data: string) => {
    const parseResult = ParseDataBySymbols(data);
    setNewError('');
    if (!data) {
      setNewError('Request is empty, write something.');
      return;
    }
    if (parseResult[0] !== 'query') {
      setNewError('Your query must start with word "query".');
      return;
    }
    if (
      parseResult[0] === 'query' &&
      (parseResult[2] === '(' || parseResult[2] === '{' || parseResult[2] === '')
    ) {
      if (parseResult[1].length > 40) {
        setNewError('Too long name of request.');
        return;
      }
      setQueryTitle(parseResult[1]);
      return;
    } else {
      setNewError('Error in your query');
    }
  };

  const DeleteRequest = () => {
    setNewRequest('');
    setNewData(null);
  };

  const EditRequest = () => {
    setNewRequest(AddTabs(request.replace(/[\r\n]+/g, '')));
  };

  const CheckVariables = (data: string) => {
    setNewVariablesError('');
    const res = data.trim().split('');
    if (res[0] !== '{' && res[-1] !== '}') {
      setNewVariablesError('Variables object must be in "{}"');
      return false;
    } else {
      try {
        JSON.parse(data);
        return true;
      } catch {
        setNewVariablesError(
          'Problem with variables query: Property keys must be doublequoted or invalid format of the variable value'
        );
        return false;
      }
    }
  };

  return (
    <section className={stylesCommon.wrapper}>
      <div className={stylesCommon.titleArea}>
        <h3 className={stylesCommon.title}>Request</h3>
        <button className={styles.button} disabled={error ? true : false} onClick={MakeRequest}>
          <span className={styles.button__title}>{queryTitle ? queryTitle : 'Run'}</span>
          <span className='material-icons'>arrow_circle_right</span>
        </button>
      </div>
      <div className={stylesCommon.main}>
        <div className={styles.editorBlock}>
          <EditorBlock type={Sections.REQUEST} rows={checkRows(request)} />
          <aside className={styles.buttons}>
            <Button icon='delete' callback={DeleteRequest} />
            <Button icon='auto_fix_high' callback={EditRequest} />
          </aside>
        </div>
        <SectionsBlock />
      </div>
    </section>
  );
};
