import React, { useContext } from 'react';
import styles from './Editor.module.scss';
import { DataContext } from '../../../context/Context';
import { Sections } from '../../../enums/Sections';

type IProps = {
  type: Sections;
};

export const Editor = ({ type }: IProps) => {
  const { request, setNewRequest, variables, setNewVariables, headers, setNewHeaders } =
    useContext(DataContext);

  const initValue =
    type === Sections.REQUEST ? request : type === Sections.VARIABLES ? variables : headers;

  const ChangeRequest = (e: React.FormEvent<HTMLTextAreaElement>) => {
    type === Sections.REQUEST
      ? setNewRequest(e.currentTarget.value)
      : type === Sections.VARIABLES
      ? setNewVariables(e.currentTarget.value)
      : setNewHeaders(e.currentTarget.value);
  };

  return (
    <>
      <form className={styles.wrapper}>
        <textarea
          className={styles.textarea}
          value={initValue}
          onInput={(e) => ChangeRequest(e)}
        ></textarea>
      </form>
    </>
  );
};
