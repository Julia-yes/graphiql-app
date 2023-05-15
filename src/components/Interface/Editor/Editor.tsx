import React, { useContext, useEffect } from 'react';
import styles from './Editor.module.scss';
import { DataContext } from '../../../context/Context';
import { FinalViewOFRequest } from '../../../utils/ParseData';
import { Loading } from '../../Loading/Loading';

export const Editor = () => {
  const { request, setNewRequest, setNewRows, loading, setNewLoading } = useContext(DataContext);

  useEffect(() => {
    setNewLoading(true);
    checkRows();
    setNewLoading(false);
  }, [request]);

  const Change = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNewRequest(e.currentTarget.value);
  };

  const checkRows = () => {
    const numNewlines = (FinalViewOFRequest(request).match(/\n/g) || []).length;
    setNewRows(numNewlines ? numNewlines : 1);
  };

  return (
    <>
      {loading && <Loading type={'spinningBubbles'} color={'#6bc8be'} />}
      <form className={styles.wrapper}>
        <textarea className={styles.textarea} value={request} onInput={(e) => Change(e)}></textarea>
      </form>
    </>
  );
};
