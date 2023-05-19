import React, { useContext } from 'react';
import styles from './Editor.module.scss';
import { DataContext } from '../../../context/Context';

export const Editor = () => {
  const { request, setNewRequest } = useContext(DataContext);

  const ChangeRequest = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNewRequest(e.currentTarget.value);
  };

  return (
    <>
      <form className={styles.wrapper}>
        <textarea
          className={styles.textarea}
          value={request}
          onInput={(e) => ChangeRequest(e)}
        ></textarea>
      </form>
    </>
  );
};
