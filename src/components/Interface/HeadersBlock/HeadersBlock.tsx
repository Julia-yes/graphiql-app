import React, { useContext } from 'react';
import styles from './HeadersBlock.module.scss';
import { DataContext } from '../../../context/Context';
import { Button } from '../../Button/Button';
import { useTranslation } from 'react-i18next';
import { Localization } from '../../../enums/Localization';

export const HeadersBlock = () => {
  const { headers, setNewHeaders, headersKey, setNewHeadersKey } = useContext(DataContext);
  const { t } = useTranslation();

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
          <option value={'default'}>{t(Localization.DEFAULT_OPTION)}</option>
          <option value={'Autorization'}>Autorization</option>
          <option value={'Accept-Language'}>Accept-Language</option>
          <option value={'Cache-Control'}>Cache-Control</option>
        </select>
        <input
          value={headers}
          onInput={(e) => ChangeHeaders(e)}
          placeholder={t(Localization.VALUE)!}
          className={styles.input}
        ></input>
      </div>
      <Button icon={'delete'} callback={DeleteHeaders} />
    </div>
  );
};
