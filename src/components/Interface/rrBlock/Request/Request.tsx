import { useContext, useEffect, useState } from 'react';
import stylesCommon from '../RRBlock.module.scss';
import styles from './Request.module.scss';
import { DataContext } from '../../../../context/Context';
import { LoadSource } from '../../../../utils/LoadSource';
import { ChecksStaples } from '../../../../utils/ChecksStaples';
import { AddTabs, ParseDataBySymbols } from '../../../../utils/ParseData';
import { Button } from '../../../Button/Button';
import { EditorBlock } from '../../EditorBlock/EditorBlock';
import { Sections } from '../../../../enums/Sections';
import { SectionsBlock } from '../SectionsBlock/SectionsBlock';
import { checkRows } from '../../../../utils/CheckRows';

export const Request = () => {
  const { setNewData, setNewError, request, error, setNewLoading, setNewRequest } =
    useContext(DataContext);
  const [queryTitle, setQueryTitle] = useState('');

  useEffect(() => {
    SetQueryName(request);
  }, [request]);

  const MakeRequest = async () => {
    const isGoodRequest = await CheckRequest(request);
    if (isGoodRequest) {
      setNewLoading(true);
      try {
        const data = await LoadSource(request);
        setNewData(data);
      } catch (error) {
        setNewError('Invalid request');
      } finally {
        setNewLoading(false);
      }
    }
  };

  const SetQueryName = (data: string) => {
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

  const CheckRequest = (data: string) => {
    const error = ChecksStaples(data);
    if (!error) {
      setNewError('problem with staples');
    }
    return error;
  };

  const DeleteRequest = () => {
    setNewRequest('');
  };

  const EditRequest = () => {
    setNewRequest(AddTabs(request.replace(/[\r\n]+/g, '')));
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
