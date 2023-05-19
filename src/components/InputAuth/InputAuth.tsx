import React from 'react';

import styles from './InputAuth.module.scss';

import { Inputs } from '../../enums/Inputs';

type Props = {
  type: 'email' | 'password';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputAuth = ({ type, value, onChange }: Props) => {
  const PATTERN = '(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*[^0-9A-Za-z]).+';

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
      placeholder={`type ${type}`}
    />
  );
};
