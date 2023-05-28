import React from 'react';

import styles from './InputAuth.module.scss';

import { Inputs } from '../../enums/Inputs';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'email' | 'password';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputAuth = ({ type, value, onChange }: Props) => {
  const { t } = useTranslation();
  const PATTERN = '(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*[^0-9A-Za-z]).+';
  const placeholder = t(type);

  let passPattern = undefined;
  if (type === Inputs.PASS) {
    passPattern = PATTERN;
  }

  return (
    <input
      required={true}
      pattern={passPattern}
      minLength={8}
      type={type}
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
