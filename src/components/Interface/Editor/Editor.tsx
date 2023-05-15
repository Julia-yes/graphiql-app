import React, { useContext } from 'react';
import styles from './Editor.module.scss';
import { DataContext } from '../../../context/Context';
import { FinalViewOFRequest } from '../../../utils/ParseData';

export const Editor = () => {
  const { request, setNewRequest, setNewRows } = useContext(DataContext);

  const Change = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNewRequest(e.currentTarget.value);
  };

  const defaultRequest = FinalViewOFRequest(request);
  const checkRows = () => {
    const numNewlines = (defaultRequest.match(/\n/g) || []).length;
    setNewRows(numNewlines);
  };
  checkRows();

  return (
    <form className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        defaultValue={defaultRequest}
        onInput={(e) => Change(e)}
      ></textarea>
    </form>
  );
};
