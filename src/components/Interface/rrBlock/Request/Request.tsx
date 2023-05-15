import React, { useContext, useState } from 'react';
import { Editor } from '../../Editor/Editor';
import stylesCommon from '../RRBlock.module.scss';
import styles from './Request.module.scss';
import { DataContext } from '../../../../context/Context';
import { LoadSource } from '../../../../utils/LoadSource';
import { ChecksStaples } from '../../../../utils/ChecksStaples';
import { FinalViewOFRequest, ParseData } from '../../../../utils/ParseData';

export const Request = () => {
  const { setNewData, setNewError, rows, request } = useContext(DataContext);
  const [queryTitle, setQueryTitle] = useState('');
  const [line, setLine] = useState('');

  const input = React.useRef<HTMLTextAreaElement>(null);

  const MakeRequest = async () => {
    if (input.current) {
      console.log('2222', input.current?.cols);

      const data = await LoadSource(input?.current.value);
      setNewData(data);
      CheckRequest(input?.current.value);
    }
  };

  

  const CheckRequest = (data: string) => {
    const parseResult = ParseData(data);
    if (parseResult[0] !== 'query') {
      setNewError('Your query must start with word "query".');
    }
    if ((parseResult[0] === 'query' && parseResult[2] === '(') || parseResult[2] === '{') {
      setQueryTitle(parseResult[1]);
    }
    const error = ChecksStaples(data);
    if (!error) {
      setNewError('problem with staples');
    }
  };

  

  const DeleteRequest = () => {};

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
        <button className={styles.button} onClick={MakeRequest}>
          <span className={styles.button__title}>{queryTitle ? queryTitle : 'Run'}</span>
          <span className='material-icons'>arrow_circle_right</span>
        </button>
      </div>
      <button onClick={() => DeleteRequest()}>
        <span className={`material-icons ${styles.button__icon}`}>delete</span>
      </button>
      <button onClick={() => FinalViewOFRequest(request)}>
        <span className={`material-icons ${styles.button__icon}`}>auto_fix_high</span>
      </button>
      <div className={styles.editorArea}>
        <div className={styles.rows}>
          {BuildRows().map((item) => (
            <div key={item} className={styles.row}>{item}</div>
          ))}
        </div>
        <Editor />
      </div>
      <textarea defaultValue={line} className={styles.text}></textarea>
    </section>
  );
};
