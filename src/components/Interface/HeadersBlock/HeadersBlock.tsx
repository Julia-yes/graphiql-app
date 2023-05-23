import React, { useContext } from 'react';
import styles from './HeadersBlock.module.scss';
import { DataContext } from '../../../context/Context';
import { Button } from '../../Button/Button';

export const HeadersBlock = () => {
  const { headers, setNewHeaders, headersKey, setNewHeadersKey } = useContext(DataContext);

  function ChangeHeaders(e: React.FormEvent<HTMLInputElement>): void {
    setNewHeaders(e.currentTarget.value);
  }

  function ChangedHeaderKey(e: React.ChangeEvent<HTMLSelectElement>): void {
    setNewHeadersKey(e.currentTarget.value);
  }

  function DeleteHeaders(): void {
    setNewHeaders('');
    setNewHeadersKey('');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headersArea}>
        <select value={headersKey} onChange={(e) => ChangedHeaderKey(e)}>
          <option value={'default'}>Choose header name</option>
          <option value={'Autorization'}>Autorization</option>
          <option value={'Accept-Language'}>Accept-Language</option>
          <option value={'Cache-Control'}>Cache-Control</option>
        </select>
        <input
          value={headers}
          onInput={(e) => ChangeHeaders(e)}
          placeholder='value'
          className={styles.input}
        ></input>
      </div>
      <Button icon={'delete'} callback={DeleteHeaders} />
    </div>
  );
};
