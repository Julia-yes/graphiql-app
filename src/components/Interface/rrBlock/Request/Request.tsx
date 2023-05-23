import { useContext, useEffect, useState } from 'react';
import { Editor } from '../../Editor/Editor';
import stylesCommon from '../RRBlock.module.scss';
import styles from './Request.module.scss';
import { DataContext } from '../../../../context/Context';
import { LoadSource } from '../../../../utils/LoadSource';
import { ChecksStaples } from '../../../../utils/ChecksStaples';
import { AddTabs, ParseDataBySymbols } from '../../../../utils/ParseData';
import { Button } from '../../../Button/Button';

export const Request = () => {
  const { setNewData, setNewError, rows, request, error, setNewLoading, setNewRequest } =
    useContext(DataContext);
  const [queryTitle, setQueryTitle] = useState('');

  useEffect(() => {
    SetQueryName(request);
  }, [request]);

  const MakeRequest = async () => {
    const isGoodRequest = await CheckRequest(request);
    if (isGoodRequest) {
      setNewLoading(true);
      const data = await LoadSource(request);
      setNewData(data);
      setNewLoading(false);
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

  const BuildRows = () => {
    let arr = [];
    for (let i = 1; i <= rows; i++) {
      arr.push(i);
    }
    return arr;
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
        <div className={styles.editorArea}>
          <div className={styles.rows}>
            {BuildRows().map((item) => (
              <div key={item} className={styles.row}>
                {item}
              </div>
            ))}
          </div>
          <Editor />
        </div>
        <aside className={styles.buttons}>
          <Button icon='delete' callback={DeleteRequest} />
          <Button icon='auto_fix_high' callback={EditRequest} />
        </aside>
      </div>
    </section>
  );
};
